/**
 * Wild Roots Hauling and Junk Removal — website lead intake
 * ---------------------------------------------------------
 * Receives every website contact/quote form submission and creates or updates
 * the matching contact inside the GoHighLevel sub-account, then:
 *
 *   - sets the custom field "Lead Source" to "Website"
 *   - sets the custom field "Website Form" to the submitting form's name
 *   - applies the tag "website-lead"
 *   - stores the visitor's message on the contact (custom field + timeline note)
 *
 * The GoHighLevel token is read from the environment so it is never exposed to
 * the browser. Configure in the hosting dashboard:
 *
 *   GHL_PRIVATE_INTEGRATION_TOKEN   private integration / access token for the
 *                                   sub-account (aliases also accepted:
 *                                   GHL_API_TOKEN, GHL_API_KEY)
 *   GHL_LOCATION_ID                 optional, defaults to the sub-account below
 */

"use strict";

var LOCATION_ID = process.env.GHL_LOCATION_ID || "v6ItU2KQfXshCzO4FilA";
var TOKEN =
  process.env.GHL_PRIVATE_INTEGRATION_TOKEN ||
  process.env.GHL_API_TOKEN ||
  process.env.GHL_API_KEY ||
  "";

var API_BASE = "https://services.leadconnectorhq.com";
var API_VERSION = "2021-07-28";
var LEAD_TAG = "website-lead";
var LEAD_SOURCE = "Website";

var FIELD_LEAD_SOURCE = "Lead Source";
var FIELD_WEBSITE_FORM = "Website Form";
var FIELD_MESSAGE = "Message";

// Cached across warm invocations so we only look the custom fields up once.
var fieldCache = null;

/* -------------------------------------------------------------------------- */
/* Helpers                                                                    */
/* -------------------------------------------------------------------------- */

function clean(value) {
  return String(value === undefined || value === null ? "" : value).trim();
}

function normalizeName(value) {
  return clean(value).toLowerCase().replace(/[^a-z0-9]+/g, "");
}

function validEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
}

function validPhone(value) {
  var digits = value.replace(/\D/g, "");
  return digits.length >= 10 && digits.length <= 15;
}

function splitName(full) {
  var parts = clean(full).split(/\s+/).filter(Boolean);
  if (!parts.length) return { first: "", last: "" };
  if (parts.length === 1) return { first: parts[0], last: "" };
  return { first: parts[0], last: parts.slice(1).join(" ") };
}

function readBody(req) {
  return new Promise(function (resolve) {
    if (req.body && typeof req.body === "object") return resolve(req.body);
    if (typeof req.body === "string" && req.body) {
      try { return resolve(JSON.parse(req.body)); } catch (e) { return resolve({}); }
    }
    var raw = "";
    req.on("data", function (chunk) { raw += chunk; });
    req.on("end", function () {
      try { resolve(raw ? JSON.parse(raw) : {}); } catch (e) { resolve({}); }
    });
    req.on("error", function () { resolve({}); });
  });
}

function ghl(path, method, body) {
  var options = {
    method: method,
    headers: {
      Authorization: "Bearer " + TOKEN,
      Version: API_VERSION,
      Accept: "application/json"
    }
  };
  if (body) {
    options.headers["Content-Type"] = "application/json";
    options.body = JSON.stringify(body);
  }

  return fetch(API_BASE + path, options).then(function (res) {
    return res.text().then(function (text) {
      var json = null;
      try { json = text ? JSON.parse(text) : null; } catch (e) { json = null; }
      return { ok: res.ok, status: res.status, json: json, text: text };
    });
  });
}

/**
 * Resolve the contact custom fields we need by name, creating any that the
 * sub-account does not have yet. A field we cannot resolve is skipped rather
 * than failing the whole submission.
 */
function resolveCustomFields(wanted) {
  var load = fieldCache
    ? Promise.resolve(fieldCache)
    : ghl("/locations/" + encodeURIComponent(LOCATION_ID) + "/customFields?model=contact", "GET").then(
        function (res) {
          if (!res.ok) throw new Error("custom field lookup failed (" + res.status + "): " + res.text);
          var list = (res.json && (res.json.customFields || res.json.customField)) || [];
          var map = {};
          list.forEach(function (field) {
            if (!field || !field.id) return;
            map[normalizeName(field.name)] = field.id;
            if (field.fieldKey) {
              map[normalizeName(String(field.fieldKey).split(".").pop())] = field.id;
            }
          });
          fieldCache = map;
          return map;
        }
      );

  return load.then(function (map) {
    return wanted.reduce(function (chain, item) {
      return chain.then(function (resolved) {
        var key = normalizeName(item.name);
        if (map[key]) {
          resolved[item.name] = map[key];
          return resolved;
        }
        return ghl("/locations/" + encodeURIComponent(LOCATION_ID) + "/customFields", "POST", {
          name: item.name,
          dataType: item.dataType || "TEXT",
          model: "contact"
        })
          .then(function (res) {
            var created = res.json && (res.json.customField || res.json.CustomField || res.json);
            if (res.ok && created && created.id) {
              map[key] = created.id;
              resolved[item.name] = created.id;
            }
            return resolved;
          })
          .catch(function () { return resolved; });
      });
    }, Promise.resolve({}));
  });
}

function buildSummary(lead) {
  var lines = [
    "New " + lead.formName + " submission from the Wild Roots Hauling website",
    "",
    "Name: " + lead.name,
    "Phone: " + lead.phone,
    "Email: " + lead.email,
    "Service address / area: " + (lead.address || "Not provided"),
    "Service needed: " + (lead.service || "Not specified"),
    "Estimated load size: " + (lead.load || "Not specified"),
    "Preferred timing: " + (lead.timing || "Not specified"),
    "",
    "Message:",
    lead.message || "No additional details provided."
  ];
  return lines.join("\n");
}

/* -------------------------------------------------------------------------- */
/* Handler                                                                    */
/* -------------------------------------------------------------------------- */

module.exports = async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");

  if (req.method === "OPTIONS") {
    res.setHeader("Allow", "POST, OPTIONS");
    res.status(204).end();
    return;
  }

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST, OPTIONS");
    res.status(405).json({ ok: false, error: "Method not allowed." });
    return;
  }

  var body = await readBody(req);

  // Honeypot — accept and drop obvious bots without touching the CRM.
  if (clean(body.company_website)) {
    res.status(200).json({ ok: true, skipped: true });
    return;
  }

  var lead = {
    name: clean(body.name),
    phone: clean(body.phone),
    email: clean(body.email),
    address: clean(body.address),
    service: clean(body.service),
    load: clean(body.load),
    timing: clean(body.timing),
    message: clean(body.message || body.details),
    formName: clean(body.formName) || "Website Form",
    pageUrl: clean(body.pageUrl)
  };

  if (!lead.name || !validEmail(lead.email) || !validPhone(lead.phone) || !lead.message) {
    res.status(400).json({ ok: false, error: "Please provide your name, phone, email and a short message." });
    return;
  }

  if (!TOKEN) {
    console.error("GoHighLevel token missing: set GHL_PRIVATE_INTEGRATION_TOKEN.");
    res.status(503).json({ ok: false, error: "Lead delivery is not configured yet." });
    return;
  }

  var parts = splitName(lead.name);

  try {
    var fields = await resolveCustomFields([
      { name: FIELD_LEAD_SOURCE, dataType: "TEXT" },
      { name: FIELD_WEBSITE_FORM, dataType: "TEXT" },
      { name: FIELD_MESSAGE, dataType: "LARGE_TEXT" }
    ]);

    var customFields = [];
    function pushField(name, value) {
      if (fields[name] && value) customFields.push({ id: fields[name], value: value });
    }
    pushField(FIELD_LEAD_SOURCE, LEAD_SOURCE);
    pushField(FIELD_WEBSITE_FORM, lead.formName);
    pushField(FIELD_MESSAGE, lead.message);

    var payload = {
      locationId: LOCATION_ID,
      firstName: parts.first,
      lastName: parts.last,
      name: lead.name,
      email: lead.email,
      phone: lead.phone,
      source: LEAD_SOURCE,
      tags: [LEAD_TAG]
    };
    if (lead.address) payload.address1 = lead.address;
    if (customFields.length) payload.customFields = customFields;

    var upsert = await ghl("/contacts/upsert", "POST", payload);
    if (!upsert.ok) {
      throw new Error("contact upsert failed (" + upsert.status + "): " + upsert.text);
    }

    var contact = (upsert.json && (upsert.json.contact || upsert.json)) || {};
    var contactId = contact.id || contact.contactId || "";

    if (contactId) {
      // Make sure the tag sticks even if the contact already existed, and drop
      // the full submission onto the contact timeline. Neither is fatal.
      await ghl("/contacts/" + encodeURIComponent(contactId) + "/tags", "POST", { tags: [LEAD_TAG] }).catch(
        function () { return null; }
      );
      await ghl("/contacts/" + encodeURIComponent(contactId) + "/notes", "POST", {
        body: buildSummary(lead) + (lead.pageUrl ? "\n\nSubmitted from: " + lead.pageUrl : "")
      }).catch(function () { return null; });
    }

    res.status(200).json({ ok: true, contactId: contactId });
  } catch (err) {
    console.error("GoHighLevel lead delivery failed:", err && err.message ? err.message : err);
    res.status(502).json({ ok: false, error: "We couldn't submit your request right now." });
  }
};
