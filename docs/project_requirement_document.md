# Product Requirements Document (PRD)
### Multi-Tenant Study-Abroad Recruitment Platform
**Author:** Olareign (TPM) · **Date:** August 2026 · **Version:** 1.0 (Discovery)
**Companion docs:** Research (00), Architecture (02), Billing (03), AI (04)

---

## 1. Product summary

A multi-tenant SaaS platform that connects **education agencies/counselors** (tenants), **students** (invited sub-users), and **universities/institutions** (supply side) to run the international study-abroad application journey end to end. The system has three surfaces:

1. **Base site** (public marketing + partner/institution onboarding).
2. **Partner app** (agency workspace: onboard/manage students, review documents, communicate with schools, generate student-onboarding links).
3. **Student micro-app** (per unique link: profile, document upload, application/admission tracking, university & course shortlisting).

**Tenancy model:** shared database, `tenant_id` row-level isolation (per your decision). Tenant = agency/counselor org. Institutions and students are scoped entities.

---

## 2. Goals & non-goals

**Goals (v1):**
- Give agencies a single workspace to manage the full student pipeline.
- Give students a guided, self-serve micro-app to submit documents and track status.
- Standardize the application → offer → enrollment workflow with an audit trail.
- Embed AI where it removes real manual work (document checks, shortlisting, drafting) — metered.
- Support global tenants with multi-currency billing and payouts.

**Non-goals (v1):**
- Building our own visa-processing or accommodation-booking engines (integrate/refer instead).
- Native mobile apps (responsive web first; mobile is a fast-follow).
- Full white-label custom-domain per tenant at launch (design for it; ship in phase 2).
- Being a system of record for university CRMs (we integrate, we don't replace).

---

## 3. Personas

| Persona | Surface | Core job-to-be-done |
|---|---|---|
| **Agency Admin** (tenant owner) | Partner app | Set up org, invite counselors, see whole pipeline, manage billing & commissions |
| **Counselor** | Partner app | Onboard/manage assigned students, review docs, apply to schools, chat with institutions |
| **Student** | Student micro-app | Build profile, upload documents, shortlist & apply, track admission status |
| **Institution User** | Institution portal | Receive/triage applications, request info, issue offers, view analytics |
| **Platform Admin** (you) | Admin console | Vet & approve tenants/institutions, configure commissions, monitor system, resolve disputes |

---

## 4. Feature requirements

Priority key: **P0** = launch-critical (MVP), **P1** = fast-follow, **P2** = later phase.

### 4.1 Base site (public)
- **F-BS-1 (P0)** Marketing pages: services, destinations, how-it-works, testimonials.
- **F-BS-2 (P0)** Partner/agency application form with vetting intake (business details, KYC docs).
- **F-BS-3 (P0)** Institution partnership enquiry form.
- **F-BS-4 (P1)** Public course/university search (SEO-driven acquisition surface).
- **F-BS-5 (P1)** Content/blog + resource hub.

### 4.2 Tenant onboarding & administration (Partner app)
- **F-TA-1 (P0)** Tenant registration → **vetting queue** → platform-admin approval (ApplyBoard-style; ~30% rejection is normal). Identity/business verification.
- **F-TA-2 (P0)** Org profile, branding (logo, colors) applied within the tenant workspace.
- **F-TA-3 (P0)** Team management: invite counselors, roles & permissions (RBAC).
- **F-TA-4 (P0)** **Data-scoped access**: counselors see only assigned students; commissions/financials restricted to admins.
- **F-TA-5 (P1)** White-label: custom subdomain per tenant (`agency.yourplatform.com`).
- **F-TA-6 (P2)** Full custom-domain white-label with per-tenant theming.

### 4.3 Student pipeline management (Partner app)
- **F-SP-1 (P0)** Add student (single) + **bulk import** (CSV) — bulk was an explicit ApplyBoard gap they fixed.
- **F-SP-2 (P0)** **Generate unique student-onboarding URL** (tokenized, expiring, revocable) → sends student to their micro-app.
- **F-SP-3 (P0)** Student list with pipeline stages (Lead → Onboarding → Docs → Applied → Offer → Enrolled).
- **F-SP-4 (P0)** Per-student view: profile, documents, applications, activity timeline.
- **F-SP-5 (P0)** Assign/reassign students to counselors.
- **F-SP-6 (P1)** Summary dashboards (pipeline health, deadlines, conversion) — Edge parity.
- **F-SP-7 (P1)** Automated deadline alerts & notifications — Edge parity.

### 4.4 Document management & review
- **F-DM-1 (P0)** Student uploads academic docs (transcripts, certificates, passport, English test, SOP, LORs). Type validation, virus scan, size limits.
- **F-DM-2 (P0)** Counselor review workflow: request / accept / reject with reasons; version history.
- **F-DM-3 (P0)** Secure storage with tenant + student scoping; signed, expiring access URLs.
- **F-DM-4 (P1)** **AI document checks** (completeness, mismatch, expiry, quality) — see Doc 04. Metered.
- **F-DM-5 (P2)** Tamper-evident verification artifact (ApplyProof-style) for institutions.

### 4.5 University & course discovery (Student + Partner)
- **F-UD-1 (P0)** Searchable catalogue of institutions/programs (filters: country, level, subject, fees, intake, entry requirements).
- **F-UD-2 (P0)** Shortlist / save programs per student.
- **F-UD-3 (P1)** **AI course matching** from student profile (scores, budget, goals) — see Doc 04.
- **F-UD-4 (P1)** Eligibility indicator per program (met / borderline / not met).
- **F-UD-5 (P2)** Scholarship discovery & matching.

### 4.6 Applications & institution communication
- **F-AP-1 (P0)** Create application: student → program, attach required docs, submit.
- **F-AP-2 (P0)** Application status lifecycle with full audit trail.
- **F-AP-3 (P0)** Threaded messaging between counselor and institution per application.
- **F-AP-4 (P0)** Institution portal: receive, request info, issue conditional/unconditional offers.
- **F-AP-5 (P1)** Deadline & intake management; missed-deadline safeguards.
- **F-AP-6 (P2)** Direct integrations/API to select university CRMs.

### 4.7 Student micro-app (per unique URL)
- **F-ST-1 (P0)** Passwordless/token entry via unique link; set credentials to persist.
- **F-ST-2 (P0)** Guided profile builder (personal, academic history, test scores, preferences).
- **F-ST-3 (P0)** Document upload center with checklist and status.
- **F-ST-4 (P0)** **Admission status tracker** (real-time, per application).
- **F-ST-5 (P0)** University/course shortlist & apply.
- **F-ST-6 (P1)** In-app chat with assigned counselor.
- **F-ST-7 (P1)** Notifications (email + in-app) for status changes & requests.
- **F-ST-8 (P2)** AI assistant (SOP drafting help, Q&A) — metered; see Doc 04.

### 4.8 Commissions, billing & payments
- **F-BP-1 (P0)** Subscription/plan management per tenant (see Doc 03 for model).
- **F-BP-2 (P0)** Usage metering (AI actions, seats, applications) feeding billing.
- **F-BP-3 (P0)** Commission tracking: institution commission per enrollment, split to tenant.
- **F-BP-4 (P0)** Payments/payouts via Stripe Connect (multi-currency).
- **F-BP-5 (P1)** Advanced/early commission option (ApplyBoard "Better Together" analog).
- **F-BP-6 (P1)** Invoices, receipts, tax handling; dunning for failed charges.

### 4.9 Platform admin console
- **F-AD-1 (P0)** Tenant & institution vetting/approval; suspend/audit.
- **F-AD-2 (P0)** Catalogue management (institutions, programs, requirements, commissions).
- **F-AD-3 (P0)** Global config: plans, feature flags, AI routing/limits.
- **F-AD-4 (P1)** Analytics: revenue, usage, pipeline conversion across tenants.
- **F-AD-5 (P1)** Dispute/refund handling; commission reconciliation.

### 4.10 Cross-cutting (all P0 unless noted)
- **F-XC-1** AuthN/AuthZ: SSO-ready, RBAC, tenant isolation enforced at data layer.
- **F-XC-2** Audit logging on all sensitive actions (docs, offers, money).
- **F-XC-3** Notifications service (email + in-app; SMS P1).
- **F-XC-4** Internationalization: multi-language (P1), multi-currency (P0), timezones.
- **F-XC-5** Data privacy: consent, export, deletion (GDPR/local law) — **P0**, non-negotiable.
- **F-XC-6** Search infrastructure for catalogue and students.

---

## 5. Key user flows

**Agency onboarding:** apply on base site → vetting queue → admin approves → workspace provisioned (tenant_id) → admin invites counselors → picks plan.

**Student onboarding:** counselor adds student → generates unique URL → student opens link → builds profile → uploads docs → counselor reviews (AI pre-check) → shortlist → apply → track status.

**Application:** counselor submits application to program → institution receives in portal → requests info / issues offer → status propagates to student micro-app in real time → on enrollment, commission recorded and split.

---

## 6. Non-functional requirements

- **Security:** encryption in transit + at rest; per-tenant data isolation verified by automated tests; signed URLs for documents; PII minimization.
- **Compliance:** GDPR (EU students), plus data-residency review per destination market (see Architecture risk A4).
- **Performance:** catalogue search < 500ms P95; document upload resilient to large files; status updates near-real-time.
- **Reliability:** 99.9% target; graceful degradation if AI provider is down (queue + fallback model).
- **Scalability:** shared-DB with tenant partitioning; horizontal scale on app tier; async workers for docs/AI (you already run BullMQ/Redis — reuse).
- **Observability:** per-tenant usage metering must be accurate enough to bill on.

---

## 7. MVP cut line

**In MVP (P0 only):** base site + vetting intake, tenant onboarding + RBAC + isolation, student add/bulk + unique-URL onboarding, document upload/review, catalogue + shortlist, applications + institution portal + messaging, student micro-app core, subscription + Stripe Connect + commission tracking, admin console core, privacy/audit/security.

**Explicitly deferred:** AI features (introduce as metered P1 once volume justifies), white-label domains, advanced commissions, verification artifacts, university CRM integrations, native mobile.

**Rationale:** ship the workflow spine and the money rails first; layer AI and white-label as monetizable upgrades once there's usage to meter and a network to defend.

---

## 8. Success metrics (define targets with stakeholders)

Activation: % of invited students who complete profile + first upload. Pipeline: applications submitted per active tenant. Conversion: application → offer → enrollment rates. Commercial: paying tenants, MRR, commission GMV, AI usage revenue, NRR. Quality: document rejection rate, application-success rate (ApplyBoard cites ~95% as the benchmark to chase). Trust: tenant vetting pass rate, dispute rate.

---

## 9. Risks & mitigations

| Risk | Mitigation |
|---|---|
| **Cold start** (no network of institutions) | Seed a focused set of destination institutions first; consider aggregator/agent-friendly "free for agents" wedge |
| **Data isolation in shared DB** | Enforce `tenant_id` at ORM + DB (RLS); automated isolation tests; see Doc 02 |
| **Compliance across jurisdictions** | Legal review pre-launch; region-aware data handling; deletion/export tooling |
| **AI cost runaway** | Routed pipeline + caching + hard per-tenant limits; meter and bill (Doc 03/04) |
| **Payments feasibility** | Validate Stripe Connect payout coverage; abstract payment layer for regional fallback |
| **Trust/fraud (bad agents)** | Productized vetting + audits + identity verification (ApplyBoard precedent) |