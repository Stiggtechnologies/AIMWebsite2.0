# Production Deployment Guide

## ✅ Implementation Complete

All production requirements have been implemented and the build is successful.

## 🔧 What Was Implemented

### 1. Environment Variables (Complete)
All required environment variables have been added to `.env`:

**Core App:**
- `NEXT_PUBLIC_APP_ENV` - Application environment
- `NEXT_PUBLIC_SITE_URL` - Public site URL

**AI Configuration:**
- `OPENAI_API_KEY` - OpenAI API key
- `OPENAI_MODEL` - Model to use (gpt-4o)
- `AI_PROVIDER` - AI provider (openai)
- `AI_TEMPERATURE` - Temperature setting (0.2)
- `AI_MAX_TOKENS` - Max tokens per response (800)

**Events & Automation:**
- `EVENTS_ENDPOINT` - AIM OS events endpoint
- `EVENTS_API_KEY` - API key for events
- `EVENT_BATCH_SIZE` - Batch size (25)
- `EVENT_TIMEOUT_MS` - Request timeout (5000)

**Analytics — Google Analytics 4:**
- `NEXT_PUBLIC_GA_ID` - GA4 measurement ID (default `G-PF1ZYXYL6X`)

**Analytics — Google Ads conversion tracking:**
Leave blank until the Ads account has conversion actions created. While
blank, the Google Ads conversion fires are silent no-ops; GA4 continues
to record events. Create three conversion actions in Google Ads
(`AIM_Intake_Form_Submit`, `AIM_Phone_Click`, `AIM_Booking_Confirm`) and
paste the Conversion ID + each Conversion Label below.

- `NEXT_PUBLIC_GOOGLE_ADS_ID` - Conversion ID `AW-XXXXXXXXXX`
- `NEXT_PUBLIC_GOOGLE_ADS_FORM_CONVERSION_LABEL` - label for intake form submit
- `NEXT_PUBLIC_GOOGLE_ADS_PHONE_CONVERSION_LABEL` - label for phone-click conversion
- `NEXT_PUBLIC_GOOGLE_ADS_BOOKING_CONVERSION_LABEL` - label for booking-confirm conversion
- `NEXT_PUBLIC_ADS_CURRENCY` - currency code (default `CAD`)
- `NEXT_PUBLIC_ADS_VALUE_PHONE` - default value for phone-click conversions (default `50`)
- `NEXT_PUBLIC_ADS_VALUE_FORM` - default value for form-submit conversions (default `150`)
- `NEXT_PUBLIC_ADS_VALUE_BOOKING` - default value for booking-confirm conversions (default `250`)

**Intake notification webhook:**
When set, `/api/intake/save` fires a fire-and-forget POST to this URL
after every *submitted* intake (drafts do not notify). Point this at
Zapier, Make, a Slack Incoming Webhook, or a custom relay so the clinic
gets notified of new leads.

- `INTAKE_NOTIFICATION_WEBHOOK_URL` - destination URL
- `INTAKE_NOTIFICATION_WEBHOOK_SECRET` - optional, sent as `X-Webhook-Secret`
- `INTAKE_NOTIFICATION_TIMEOUT_MS` - request timeout (default `5000`)

**AIM OS Integration:**
- `AIM_OS_API_BASE` - AIM OS API base URL
- `AIM_OS_API_KEY` - AIM OS API key
- `AIM_OS_WEBHOOK_SECRET` - Webhook verification secret

**Security:**
- `RATE_LIMIT_PER_MIN` - Rate limit (60)
- `CSP_ENABLED` - Content Security Policy (true)

### 2. AIM OS Integration (Complete)

**New Files Created:**
- `lib/aim-os.ts` - AIM OS client with type-safe API methods
- `app/api/intake/init/route.ts` - Intake handoff endpoint
- `app/api/booking/confirm/route.ts` - Booking confirmation endpoint
- `app/api/webhooks/aimos/route.ts` - Webhook receiver with signature verification

**API Endpoints:**
- `POST /api/intake/init` - Initiates intake handoff to AIM OS
- `POST /api/booking/confirm` - Confirms booking with AIM OS
- `POST /api/webhooks/aimos` - Receives status updates from AIM OS
- `POST /api/events` - Enhanced to forward events to AIM OS

### 3. PHI Protection (Complete)

**New Files Created:**
- `lib/phi-validator.ts` - PHI detection and blocking

**Features:**
- Pattern detection for SIN, health cards, DOB, etc.
- Keyword scanning for medical terms
- Field name validation
- Automatic sanitization for AI chat
- Clear refusal messages when PHI detected

**AI System Prompt Updated:**
- Added critical PHI protection rules
- AI explicitly refuses PHI
- Guides users to secure intake forms

### 4. Rate Limiting (Complete)

**New Files Created:**
- `lib/rate-limiter.ts` - In-memory rate limiting

**Features:**
- 60 requests per minute per IP (configurable)
- Rate limit headers in responses
- Applied to all API endpoints:
  - `/api/events`
  - `/api/ai/chat`
  - `/api/intake/init`
  - `/api/booking/confirm`

### 5. AI Configuration & Master Training (Complete)

**AI System Updates:**
- Comprehensive master training prompt implemented
- AI identifies itself as "AIM AI" - a digital front-desk coordinator
- 9-persona classification system (IW, MVA, ATH, SR, EMP, INS, REF, RET, COLD)
- Strict PHI protection boundaries
- Enhanced escalation logic for seniors, high-value clients, and emergencies
- Safe language guidelines for insurance/WCB coverage
- Conversation opening: "Hi, I'm AIM AI. I can help you book care, understand our programs, or guide you to the right next step. How can I help today?"

**Technical Configuration:**
- AI client uses environment variables for model, temperature, and max tokens
- Temperature set to 0.2 for consistent, safe responses
- Fetches context from AIM OS API before responding
- PHI validation on all user messages
- Automatic message sanitization
- Enhanced intent detection (8 intent types)
- Escalation triggers for confusion, anxiety, legal questions

**Fallback AI:**
- Simple AI updated to match master training language
- Consistent persona-aware responses
- Safe insurance language across both AI systems

**Documentation:**
- `AI_TRAINING_DOCUMENTATION.md` - Complete training guide
- Persona framework details
- Triage boundaries
- Safe language examples
- Testing scenarios

## 🚀 Deployment Steps

### Step 1: Configure Vercel Environment Variables

In your Vercel project settings, add all environment variables from `.env`:

```bash
# Core App
NEXT_PUBLIC_APP_ENV=production
NEXT_PUBLIC_SITE_URL=https://aimphysiotherapy.ca

# AI (Primary)
OPENAI_API_KEY=<your_openai_key>
OPENAI_MODEL=gpt-4o
AI_PROVIDER=openai
AI_TEMPERATURE=0.2
AI_MAX_TOKENS=800

# Events & Automation
EVENTS_ENDPOINT=https://api.aimos.ca/events
EVENTS_API_KEY=<your_events_api_key>
EVENT_BATCH_SIZE=25
EVENT_TIMEOUT_MS=5000

# AIM OS Integration
AIM_OS_API_BASE=https://api.aimos.ca
AIM_OS_API_KEY=<your_aim_os_api_key>
AIM_OS_WEBHOOK_SECRET=<your_webhook_secret>

# Security
RATE_LIMIT_PER_MIN=60
CSP_ENABLED=true

# Analytics (Optional)
NEXT_PUBLIC_GA_ID=<your_ga_id>
```

### Step 2: Update AIM OS Configuration

Configure the webhook URL in AIM OS to point to:
```
https://aimphysiotherapy.ca/api/webhooks/aimos
```

### Step 3: Deploy to Vercel

```bash
git add .
git commit -m "Add production AIM OS integration with PHI protection"
git push origin main
```

Vercel will automatically build and deploy.

## 🔒 Security Features

### PHI Protection
- ✅ Pattern matching for sensitive identifiers
- ✅ Keyword detection for medical terms
- ✅ Field name validation
- ✅ Automatic message sanitization
- ✅ AI trained to refuse PHI

### Rate Limiting
- ✅ 60 requests/min per IP
- ✅ Applied to all API endpoints
- ✅ Graceful error responses

### Webhook Security
- ✅ HMAC signature verification
- ✅ Timing-safe comparison
- ✅ Configurable secret key

## 📊 Event Flow

1. **User Action** → Website captures event
2. **Local Storage** → Event saved to Supabase
3. **AIM OS Forward** → Event forwarded to AIM OS with persona data
4. **Batch Processing** → AIM OS processes events for automation
5. **Webhook Response** → Status updates sent back to website

## 🔄 API Contract

### Event Ingestion
```typescript
POST /api/events
{
  event_type: "page_view | cta_click | ai_message | form_submit | booking_confirmed",
  session_id: "uuid",
  event_data: { ... },
  persona_snapshot: { ... }
}
```

### Intake Handoff
```typescript
POST /api/intake/init
{
  handoff_token: "uuid",
  persona: "IW | ATH | EMP | INS | SR | COLD",
  program: "wcb-rehab",
  location: "edmonton-west",
  urgency: "low | medium | high",
  contact_pref: "phone | email",
  notes: "non-clinical summary"
}
```

### Booking Confirmation
```typescript
POST /api/booking/confirm
{
  booking_id: "uuid",
  location: "edmonton-west",
  time: "ISO-8601",
  handoff_token: "uuid"
}
```

### Webhook Receiver
```typescript
POST /api/webhooks/aimos
{
  type: "intake_status_update",
  intake_id: "uuid",
  status: "assigned | scheduled | completed"
}
```

## 🧪 Testing Checklist

Before going live, test:

- [ ] Event forwarding to AIM OS
- [ ] PHI detection and blocking
- [ ] Rate limiting functionality
- [ ] Intake handoff flow
- [ ] Booking confirmation
- [ ] Webhook signature verification
- [ ] AI chat with AIM OS context
- [ ] Error handling for AIM OS downtime

## 📝 Notes

- **Database:** Supabase is already configured and stores all data locally
- **No PHI:** Website stores only codes, references, and non-identifying data
- **Fail-Safe:** If AIM OS is unavailable, events still save locally
- **AI Fallback:** Simple AI responses work without OpenAI API key
- **Build Status:** ✅ Successful (warnings are from Supabase realtime - safe to ignore)

## 🆘 Support

If issues arise:

1. Check Vercel function logs
2. Verify environment variables are set
3. Test AIM OS API endpoints directly
4. Review webhook signature configuration
5. Check rate limit settings

## 🎯 Production-Ready Features

✅ All environment variables configured
✅ AIM OS integration complete
✅ PHI validation and blocking
✅ Rate limiting enabled
✅ Webhook receiver with security
✅ AI configured with production settings
✅ Build successful
✅ Type-safe API contracts
✅ Error handling throughout
✅ Graceful degradation
