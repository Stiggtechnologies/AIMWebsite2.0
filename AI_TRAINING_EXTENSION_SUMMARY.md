# AIM AI - Qualifying + Booking Extension Summary

## 🎯 Extension Overview

The AIM AI assistant has been extended with **qualifying** and **booking** capabilities while maintaining all original safety guardrails and PHI protection.

## ✅ What Was Added

### 1. Qualifying Capability (Administrative Only)

The AI can now qualify users on **non-clinical, administrative eligibility**:

**Allowed Qualifying Questions:**
- Injury type (work-related, MVA, personal)
- Program type (WCB, MVA, athletic, senior)
- Readiness to book (now, callback, researching)
- Booking preferences (location, time, contact method)

**NOT Allowed:**
- Medical history
- Symptom assessment
- Clinical severity
- Treatment recommendations
- Insurance coverage confirmation

### 2. Booking Capability (Controlled)

The AI can now initiate bookings through a **4-step secure flow**:

**Step 1: Booking Offer**
> "I can help you book an appointment now, or I can have our team contact you. What would you prefer?"

**Step 2: Collect Preferences (Non-PHI)**
- Location
- Preferred days/times
- Contact method

**Step 3: Secure Handoff**
Pass data to booking system via `/api/booking/confirm`

**Step 4: Safe Confirmation**
> "Your request has been sent to our team. You'll receive confirmation shortly."

### 3. Internal Qualification States

The AI internally tracks (never shown to users):

| State | Meaning | Action |
|-------|---------|--------|
| QUALIFIED_BOOK_NOW | Ready to book | Initiate booking |
| QUALIFIED_CALLBACK | Needs human | Schedule callback |
| QUALIFIED_REVIEW | Admin review | Send to admin |
| UNQUALIFIED | Education needed | Provide resources |

### 4. Enhanced Escalation Rules

The AI **MUST escalate** (not book) if:
- User is a senior and uncertain
- Legal or insurance questions
- Employer or insurer booking
- High urgency
- Coverage confusion
- Any PHI offered

**Escalation phrasing:**
> "To make sure this is handled correctly, I'll connect you with our team."

## 🔒 Safety Guarantees

All original safety measures remain intact:

✅ **PHI Protection:** Multi-layer validation blocks all PHI
✅ **No Medical Advice:** AI never diagnoses or recommends treatment
✅ **Safe Language:** Only approved insurance/coverage language
✅ **Smart Escalation:** Automatic escalation for complex cases
✅ **Data Security:** No PHI stored, immediate handoff to secure systems

## 📋 Files Updated

1. **lib/ai.ts**
   - Added qualifying + booking extension to `AIM_SYSTEM_PROMPT`
   - Extended from ~202 lines to ~319 lines
   - Maintains all original guardrails

2. **lib/simple-ai.ts**
   - Updated fallback responses to include booking language
   - Aligned with new qualifying flow
   - Consistent escalation for employers/insurers

3. **AI_TRAINING_DOCUMENTATION.md**
   - Added comprehensive qualifying + booking section
   - Includes 4 new testing scenarios
   - Documents qualification states and booking flow

4. **README_PRODUCTION.md**
   - Updated AI capabilities description
   - Added 3 new testing scenarios
   - Added qualifying/booking language examples

## 🧪 Key Testing Scenarios

### ✅ Successful Qualification + Booking
```
User: "I hurt my back at work and need help"
AI:
1. Identifies IW persona
2. "Was this injury related to work?" → Yes
3. "Which location works best?" → Edmonton West
4. "I can help you book now or have our team contact you" → Book now
5. Collects preferences → Initiates booking
6. "Your request has been sent to our team"
```

### ⚠️ Senior with Uncertainty → Escalate
```
User: "I'm 72 and want to book but I'm not sure what I need"
AI: Detects senior + uncertainty
→ Immediate escalation (NO booking)
→ "To make sure this is handled correctly, I'll connect you with our team."
```

### ⚠️ Employer Booking → Escalate
```
User: "I'd like to book an appointment for my employee"
AI: Detects employer
→ Immediate escalation (NO booking)
→ "I want to make sure this is handled properly."
```

### ⚠️ Coverage Question → Escalate
```
User: "Will this be covered by WCB?"
AI: Coverage uncertainty
→ Escalation
→ "Our team coordinates directly with insurers. Let me connect you with them to confirm."
```

## 🎯 Core Principles (Unchanged)

1. **Safety First:** When in doubt, escalate
2. **No Medical Advice:** AI guides, clinicians decide
3. **PHI Protection:** Zero tolerance for PHI
4. **User Experience:** One question at a time
5. **Graceful Degradation:** System works without OpenAI

## 🆕 New Principles (Added)

6. **Qualifying Boundaries:** Administrative eligibility only (non-clinical)
7. **Booking Control:** AI initiates, system confirms
8. **Escalate Smart:** Seniors, employers, coverage questions → human

## 📊 Expected Impact

### Positive Outcomes:
- **Reduced Staff Workload:** AI handles simple booking requests
- **Faster Booking:** Users can initiate booking 24/7
- **Better Routing:** Administrative qualification before human handoff
- **Increased Conversion:** Lower friction to booking

### Maintained Safeguards:
- **Zero PHI Risk:** All PHI protection remains active
- **Clinical Boundaries:** No medical advice or assessment
- **Smart Escalation:** Complex cases still go to humans
- **Safe Language:** Only approved insurance language used

## 🚀 Deployment Status

✅ **Build:** Successful (npm run build passing)
✅ **Type Safety:** All types validated
✅ **Documentation:** Complete
✅ **Testing Scenarios:** 7 scenarios defined
✅ **Backward Compatible:** All existing functionality preserved

## 📖 Reference Documents

- **AI_TRAINING_DOCUMENTATION.md** - Complete training guide with qualifying + booking section
- **README_PRODUCTION.md** - Production system overview with new capabilities
- **PRODUCTION_DEPLOYMENT.md** - Deployment guide (AI section updated)

## 🔄 Integration Points

### Existing Endpoints (Used):
- `POST /api/booking/confirm` - Booking handoff
- `POST /api/intake/init` - Intake handoff
- `POST /api/events` - Event tracking

### Data Flow:
1. User qualifies → Internal state assigned
2. User confirms booking → Data collected (non-PHI)
3. AI calls booking endpoint → Secure handoff
4. System confirms → User notified
5. Event logged → Supabase + AIM OS

## 🎓 Training Summary

**Original Training:** Non-clinical intake and routing coordinator

**Extended Training:** Non-clinical intake, routing, **and scheduling** coordinator

**Key Addition:** "You are allowed to qualify and initiate booking, but you are never allowed to make care decisions."

**Unchanged:** "Licensed clinicians and staff handle all care decisions."

## ✅ Quality Assurance

- [x] All original guardrails maintained
- [x] PHI protection tested and verified
- [x] Escalation triggers expanded
- [x] Safe language guidelines extended
- [x] Build successful
- [x] Documentation complete
- [x] Testing scenarios defined
- [x] Backward compatible

## 🎯 Success Criteria

1. **Conversion Rate:** Increase in booking completion
2. **Escalation Rate:** 15-25% (healthy range maintained)
3. **PHI Blocks:** 100% detection (no regression)
4. **User Satisfaction:** Positive feedback on booking ease
5. **Staff Efficiency:** Reduced simple booking inquiries

---

---

## 🔄 Update 2: Employer/Insurer Booking & Reschedule/Cancel Flows

### NEW CAPABILITIES (Added)

**1. Booking Modes (Internal Classification)**

The AI now internally assigns booking modes:

| Mode | Description | Action |
|------|-------------|--------|
| PATIENT_SELF_BOOK | Patient booking for themselves | Proceed to direct scheduling |
| EMPLOYER_CONSULT | Employer requesting program/consultation | Controlled form + human confirmation |
| INSURER_REFERRAL | Insurer referring patient | Secure handoff to human intake |
| CALLBACK_REQUIRED | Complex case requiring human | Schedule callback |

**CRITICAL:** Only `PATIENT_SELF_BOOK` proceeds to direct scheduling. All employer/insurer requests require human confirmation.

**2. Employer Logic (EMP Persona)**

**Trigger Conditions:**
- User identifies as employer / HR / safety / supervisor
- Visits `/employers/*`
- Mentions "return to work", "RTW", "injury prevention", "onsite", "contract", "multiple workers"

**AI Behavior:**
1. Confirm role + intent:
   > "Are you looking to refer an employee for care, or set up a return-to-work / injury prevention program?"

2. Collect NON-PHI employer qualifiers (allowed):
   - Company name
   - Industry
   - City/site location
   - Approximate employee count range (1–20, 21–100, 100+)
   - "Is this for one employee or multiple?" (do NOT collect names/injury details)
   - Preferred contact method/time

3. Route outcome:
   - If "program/contract" → `EMPLOYER_CONSULT` booking mode
   - If "single employee referral" → `CALLBACK_REQUIRED` (human handles PHI)

**Employer CTAs:**
- "Request Employer Consultation"
- "Request a Call Back"

**Employer Escalation:**
If employer tries to provide employee medical details:
> "To protect privacy, I can't collect medical details here. I'll connect you with our team to handle the referral securely."

**3. Insurer / Case Manager Logic (INS Persona)**

**Trigger Conditions:**
- Mentions "adjuster", "case manager", "insurer", "claims", "WCB file", "treatment authorization"
- Visits `/insurers/*`

**AI Behavior:**
1. Confirm insurer role:
   > "Are you an insurer/case manager referring a patient, or asking about reporting/outcomes?"

2. Collect NON-PHI insurer qualifiers (allowed):
   - Organization name (WCB / insurer)
   - Role (adjuster, case manager)
   - Volume range (1–5/mo, 6–20/mo, 20+/mo)
   - Preferred contact + time
   - Location preference (if applicable)

3. Route outcome:
   - Referral → `INSURER_REFERRAL` (secure handoff to human intake)
   - Reporting/outcomes → `INSURER_REFERRAL` + route to insurer liaison

**Insurer Escalation:**
If they ask coverage/authorization decisions:
> "I can explain the referral process, but authorization decisions are handled by our team. I'll connect you with the correct liaison."

**4. Reschedule / Cancel Flows (Token-Based)**

**Reschedule Flow:**
1. Confirm intent: "Are you rescheduling or cancelling?"
2. Ask for verification: "Do you have your appointment confirmation link or booking reference code?"
3. If code provided:
   - Look up booking (no PHI)
   - Present available times (if system returns them)
   - Confirm reschedule
   - "Done — your appointment has been rescheduled. You'll receive an updated confirmation."
4. If no link/code → escalate to human

**Cancel Flow:**
1. Ask for link/code
2. Ask reason category (optional, non-PHI):
   - "Schedule conflict"
   - "Feeling better"
   - "Need to talk to clinic"
3. Cancel booking
4. Confirm + offer rebook: "Cancelled. If you'd like, I can help you rebook."

**Reschedule/Cancel Escalation:**
Escalate if:
- No link/code provided
- Conflicting identity
- User angry/frustrated
- "urgent pain" language
- Employer/insurer attempting to change patient appointment

### Database Tables Added

**1. `public_leads` (Non-PHI)**
Stores contact and routing information for potential patients.

**Key Fields:**
- `persona`, `program_interest`, `location_slug`
- `urgency`, `contact_method`, `contact_value`
- `booking_mode`, `qualification_state`
- `status` (new/contacted/booked/closed/cancelled)

**2. `org_requests` (Non-PHI)**
Stores employer and insurer consultation/referral requests.

**Key Fields:**
- `org_type` (EMPLOYER/INSURER)
- `org_name`, `role`, `intent`
- `volume_range`, `location_preference`
- `contact_method`, `contact_value`
- `status` (new/contacted/in_progress/completed/cancelled)

**3. `booking_tokens` (No PHI)**
Secure tokens for reschedule/cancel operations.

**Key Fields:**
- `booking_ref` (unique public reference code)
- `lead_id` (reference to public_leads)
- `expires_at` (token expiration)
- `status` (active/used/expired/cancelled)
- `action_type` (booking/reschedule/cancel/confirm)

### New API Endpoints

**1. `POST /api/intake/org`**
Handles employer and insurer requests.

**Payload:**
```json
{
  "handoff_type": "org_request",
  "org_type": "EMPLOYER | INSURER",
  "org_name": "string",
  "role": "string",
  "intent": "RTW_PROGRAM | INJURY_PREVENTION | REFERRAL | REPORTING | CONSULTATION",
  "volume_range": "string",
  "location_preference": "string",
  "contact_method": "phone | email | either",
  "contact_value": "string",
  "contact_window": "string",
  "notes": "string",
  "persona": "EMP | INS"
}
```

**2. `POST /api/booking/lookup`**
Look up booking by reference code (no PHI).

**Payload:**
```json
{
  "booking_ref": "ABC123",
  "action": "lookup"
}
```

**3. `POST /api/booking/reschedule`**
Request reschedule with booking reference.

**Payload:**
```json
{
  "booking_ref": "ABC123",
  "new_time": "2026-01-28T15:00:00-07:00",
  "preferred_times": ["weekday mornings"]
}
```

**4. `POST /api/booking/cancel`**
Cancel booking with reference.

**Payload:**
```json
{
  "booking_ref": "ABC123",
  "cancel_reason": "schedule_conflict | feeling_better | need_clinic | other",
  "notes": "string"
}
```

**5. `POST /api/booking/confirm` (Updated)**
Now creates public_leads and booking_tokens.

**Updated Payload:**
```json
{
  "handoff_type": "booking",
  "persona": "IW",
  "program": "wcb-rehab",
  "location": "edmonton-west",
  "preferred_times": ["weekday mornings"],
  "contact_method": "phone",
  "contact_value": "780-250-8188",
  "booking_mode": "PATIENT_SELF_BOOK",
  "urgency": "low",
  "notes": "string"
}
```

### Testing Scenarios (New)

#### Scenario 1: Employer Requesting Program
```
User: "I'm an HR manager and we need workplace injury prevention"
AI:
1. Identifies EMP persona
2. "Are you looking to set up a return-to-work / injury prevention program?"
3. Collects: company name, industry, employee count
4. Assigns: EMPLOYER_CONSULT booking mode
5. Routes to /api/intake/org
6. "Your request has been submitted. Our team will contact you shortly."
```

#### Scenario 2: Insurer Referring Patient
```
User: "I'm a case manager with WCB and need to refer a patient"
AI:
1. Identifies INS persona
2. "Are you an insurer/case manager referring a patient?"
3. Collects: organization, role, volume
4. Assigns: INSURER_REFERRAL booking mode
5. Routes to /api/intake/org
6. "To protect privacy, I'll connect you with our team to handle the referral securely."
```

#### Scenario 3: Patient Rescheduling
```
User: "I need to reschedule my appointment"
AI:
1. "Are you rescheduling or cancelling?"
2. "Do you have your booking reference code?"
3. User provides: "BK12345"
4. Looks up booking via /api/booking/lookup
5. Collects preferred new times
6. Calls /api/booking/reschedule
7. "Done — your appointment has been rescheduled."
```

#### Scenario 4: Patient Cancelling
```
User: "I need to cancel my appointment"
AI:
1. "Do you have your booking reference code?"
2. User provides: "BK12345"
3. Asks: "What's the reason? Schedule conflict / Feeling better / Need to talk to clinic"
4. Calls /api/booking/cancel
5. "Your appointment has been cancelled. If you'd like to rebook, please let us know."
```

### PHI Protection (Enhanced)

All new flows maintain strict PHI protection:

✅ **Employer Flow:** No employee names, injuries, or medical details collected
✅ **Insurer Flow:** No patient details, only organizational info
✅ **Reschedule/Cancel:** Token-based verification, no PHI required
✅ **Database Tables:** Zero PHI stored in any table

### Security Architecture

**Web Layer (Non-PHI):**
- Website collects non-PHI qualifiers only
- Supabase stores contact/routing data
- Booking tokens for reschedule/cancel

**Clinical Layer (PHI):**
- EMR handles all PHI
- Server-to-server integration
- Human confirmation for employer/insurer requests

### Files Updated (v2.0)

**AI System Prompt:**
- `lib/ai.ts` - Added employer/insurer logic + reschedule/cancel flows

**Database:**
- Migration: `add_booking_and_org_tables.sql`
- Tables: `public_leads`, `org_requests`, `booking_tokens`

**API Endpoints (New):**
- `app/api/intake/org/route.ts`
- `app/api/booking/lookup/route.ts`
- `app/api/booking/reschedule/route.ts`
- `app/api/booking/cancel/route.ts`

**API Endpoints (Updated):**
- `app/api/booking/confirm/route.ts` - Integrated with new tables

**Documentation:**
- `AI_TRAINING_EXTENSION_SUMMARY.md` - This file

---

**Extension Version:** 2.0.0
**Date Implemented:** January 24, 2026
**Status:** Production Ready ✅
