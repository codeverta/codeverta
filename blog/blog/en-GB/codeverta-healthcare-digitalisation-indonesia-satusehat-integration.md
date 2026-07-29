---
title: "Codeverta and Indonesian Healthcare Digitalisation: From RME to SATUSEHAT Integration"
date: "2026-07-29"
image: "/assets/healthcare/editorial/codeverta-healthcare-digitalization-hero.png"
desc: "The story of how Codeverta helps healthcare facilities build operational systems, electronic medical records, and SATUSEHAT integration pathways that are ready for daily use."
tags: "Codeverta healthcare, Indonesia healthcare digitalisation, SATUSEHAT integration, electronic medical records, RME, hospital information system, clinic management system, FHIR Indonesia, healthcare software"
translationOf: "26-codeverta-membantu-digitalisasi-healthcare-indonesia-integrasi-satusehat"
---

# Codeverta and Indonesian Healthcare Digitalisation: From RME to SATUSEHAT Integration

Healthcare digitalisation is often discussed as if the work is done when a clinic stops using paper. The reality is not that simple.

Converting forms into screens is indeed part of the process. But the heavier work comes afterwards: ensuring patient data is not duplicated, the workflow for doctors and nurses remains comfortable, medicine stock is linked to prescriptions, lab results enter the correct history, and mandatory data can be sent to the national ecosystem.

That is where Codeverta takes its role. We help build the technology layer that healthcare facilities use every day, from clinic and hospital management systems, electronic medical records, pharmacy, laboratory, healthcare personnel scheduling, to preparation for integration with SATUSEHAT.

The role is quite clear. The Ministry of Health (Kementerian Kesehatan) builds SATUSEHAT as a national health data exchange platform. Codeverta works on the facility and operational system side: making data that arises from daily services neat, structured, secure, and ready to be exchanged according to Ministry regulations.

![Healthcare professionals using a digital system in a clinic in Indonesia](/assets/healthcare/editorial/digital-clinic-indonesia.png)

_Editorial illustration: technology should follow the service workflow, not make healthcare professionals busy serving the application._

## The Problem Is Not Simply “Doesn’t Have an Application Yet”

In many healthcare facilities, applications already exist. Registration uses one system, the polyclinic uses another, the laboratory has its own records, while pharmacy and cashier still rely on spreadsheets. Each part can work, but their data does not always speak the same language.

The consequences are easy to predict:

- patients have to repeat data they have already given;
- staff copy information from one screen to another;
- doctors are late seeing test results;
- medicine stock in the system differs from what is on the shelf;
- management reports are only completed after several reconciliations;
- IT teams struggle to prepare data for interoperability needs.

We do not start a healthcare project by asking, “what features should we build?” The first question is usually simpler: from the patient’s arrival to departure, who does what, what data changes, and at which point does the process most frequently stall?

The answers to that question become the foundation of the system.

![Codeverta clinic management system view](/assets/healthcare/manajemen-klinik.png)

_Example of a clinic management system interface for unifying administrative work and services._

## Building the Foundation: One Flow, One Patient History

A good healthcare system should not feel like a collection of menus. It must follow the patient’s journey.

When a patient registers, the system creates or finds the correct identity. When the patient enters the polyclinic, the doctor sees the relevant history. When the doctor makes a prescription or requests an investigation, pharmacy and laboratory receive the data without re-typing. After the service is complete, clinical information and transactions remain linked to the same visit.

We apply this principle in several layers.

### Patient registration and identity

Data search must be fast, but not haphazard. The system needs to help staff recognise possible duplicate data, store identities consistently, and maintain the relationship between patient, visit, guarantor, and facility.

![Patient data details in the healthcare system](/assets/healthcare/patient-detail.png)

_Demographic data, contact information, and service context are stored in a structured profile._

### Electronic medical records that are actually used

RME is not a PDF archive moved to a computer. Inside it there are examination notes, diagnoses, allergies, procedures, clinical observations, prescriptions, supporting test results, and data change logs.

The biggest challenge is not adding as many columns as possible. The challenge is to make it possible for doctors to record comprehensively without prolonging consultation time. Therefore, form structure, information order, access rights, and clinical templates need to be arranged together with users.

![Electronic medical record on the Codeverta healthcare platform](/assets/healthcare/rekam-medis-elektronik.png)

_RME is the centre of service context, not just a replacement for paper files._

![Patient service history in a single view](/assets/healthcare/patient-history.png)

_Connected history helps healthcare professionals understand what happened during previous visits._

### Doctor workflow and inter-unit coordination

Doctors need a concise summary: today's patients, queue status, unreviewed test results, and actions that need follow-up. The operational team needs a different view. The system must provide both without creating new data copies.

![Doctor dashboard in the Codeverta healthcare system](/assets/healthcare/doctor-dashboard.png)

_The doctor dashboard places follow-up work in a single workspace._

![Patient and healthcare worker schedule](/assets/healthcare/patient-schedule.png)

_Connected scheduling helps reduce schedule clashes and unnecessary queuing._

## SATUSEHAT Integration Begins Long Before Calling the API

SATUSEHAT is the official platform of the Ministry of Health for connecting health information systems through standardisation and RME integration. Its data exchange uses the global HL7 FHIR standard. The Ministry also distinguishes between facilities that use RME from partners/vendors and facilities that develop their own RME.

Technically, API documentation is important. But integration does not start from endpoints. Integration starts from data quality within the facility.

Before a visit can be sent, the system must know the correct patient, the healthcare worker providing the service, the organisation and location of the service, the encounter time, diagnosis, observations, and the prescribed medication. If the source data is inconsistent, a successful API connection still does not produce good interoperability.

![Illustration of national health data interoperability](/assets/healthcare/editorial/satusehat-interoperability-indonesia.png)

_Editorial illustration: clinics, hospitals, laboratories, and pharmacies exchange data through a secure interoperability layer._

In integration work, Codeverta helps translate events on the ground into exchangeable data structures. For example:

- patient identity is mapped to the `Patient` resource;
- healthcare workers and facilities are mapped via `Practitioner`, `Organization`, and `Location`;
- registration and visit journey are recorded as `Encounter`;
- diagnoses and clinical complaints can use `Condition`;
- examination results and vital signs are sent as `Observation`;
- prescriptions and medication dispensing use resources such as `MedicationRequest` and `MedicationDispense`.

For outpatient care, SATUSEHAT documentation also regulates the use of the patient’s IHS Number from the Ministry of Health's Master Patient Index. Meanwhile, for pharmaceutical services, the flow includes prescription data, medication dispensing, and visit updates. This means integration is not one “send all” button, but a series of transactions that follow the service context.

Technical references always follow the official documentation, including the [SATUSEHAT outpatient playbook](https://satusehat.kemkes.go.id/platform/docs/id/interoperability/rme-rawat-jalan/), [pharmaceutical services playbook](https://satusehat.kemkes.go.id/platform/docs/id/interoperability/kefarmasian/), and [facility registration guide](https://satusehat.kemkes.go.id/platform/docs/id/registration-guide/regis-institution/).

Important note: Codeverta is not the owner or manager of SATUSEHAT. That platform is managed by the Ministry of Health. We help healthcare facilities and RME system managers prepare the applications, data, integration processes, testing, and monitoring needed to connect with that ecosystem.

## Not Just RME: Hospital Operations Must Also Be Connected

Healthcare does not stop at the doctor's desk. There are laboratories, pharmacies, supplies, equipment maintenance, room scheduling, finance, and equally important administrative tasks.

### Laboratory

Examination requests need to reach the correct unit, using the same patient and visit identity. After results are verified, the doctor must be able to see them without waiting for paper files or private messages.

![Laboratory test module in the healthcare system](/assets/healthcare/lab-test-investigation.png)

_Examination requests and laboratory results remain linked to the patient visit._

### Prescription, pharmacy, and inventory

A digital prescription is not just a list of drugs. The system needs to handle dosage, instructions for use, dispensing status, stock, batch, and expiry dates. Clinical data and inventory data have different needs, but they meet in the same process.

![Electronic medication request](/assets/healthcare/medication-request.png)

_Medication request keeps the prescription flow traceable from doctor to pharmacy._

![Integrated pharmacy point of sale](/assets/healthcare/point-of-sales-pharamcy.png)

_Pharmacy transactions are linked to inventory so that drug movements are not recorded twice._

![Analysis of drug and medical device stock age](/assets/healthcare/stock-ageing.png)

_Stock ageing helps teams see items that have been stored for a long time or are approaching their use-by date._

### Assets and maintenance

Medical equipment is not just registered as inventory. There are calibration schedules, maintenance, breakdowns, responsible persons, and action records that need to be documented.

![List of asset maintenance tasks for healthcare facilities](/assets/healthcare/maintenance-tasks.png)

_Facility teams can see open maintenance tasks and priority follow-ups._

![Healthcare asset maintenance log](/assets/healthcare/asset-maintenance-log.png)

_Maintenance logs make asset conditions easier to audit and do not rely on one person's memory._

### Service structure and management perspective

Facilities with many polyclinics, rooms, or branches need a clear unit structure. From that structure, access rights, schedules, cost allocation, and reporting can follow the real organisation.

![Healthcare facility service unit tree](/assets/healthcare/service-unit-tree.png)

_The unit structure helps the system follow the facility's organisation, not the other way around._

![Healthcare service profitability analysis](/assets/healthcare/profitability-analysis.png)

_Management can view operational and financial aspects without digging through spreadsheets from many units._

## Infrastructure That Is Invisible but Crucial

Users see forms, tables, and dashboards. Behind them there is work that is no less important:

- role-based access control for doctors, nurses, pharmacy, cashier, and administrators;
- audit trail so that important data changes are traceable;
- data validation before entering the integration queue;
- retry mechanism when external services are unavailable;
- recording API responses to help investigate failures;
- separation of development, sandbox, and production environments;
- backup, monitoring, and service recovery procedures;
- protection of personal data according to context and user authority.

Specifically for SATUSEHAT integration, HTTP status 200 or 201 is not the only measure of success. The team also needs to know which resources have been sent, which were rejected, why they were rejected, and whether the correction can be made safely without creating duplicate data.

The Ministry of Health provides a monitoring dashboard to view successful RME data deliveries. On the application side, we complement that need with logging and operational monitoring tools so that facility teams do not have to guess when problems occur.

![List of operational issues in the healthcare platform](/assets/healthcare/issues.png)

_Issues and follow-ups need to be recorded like any other part of operations, not lost in private conversations._

## How We Carry Out Implementation

Each facility has different habits, scale, and readiness levels. Therefore, we do not treat implementation like installing an application and then handing over an account.

Usually the work runs in several stages.

**First, mapping the flow that actually happens.** We follow the data journey from registration, service, support units, pharmacy, payment, to reporting. Processes that exist only in SOPs but do not happen in the field need to be distinguished from the start.

**Second, cleaning up master data.** Patient identities, healthcare workers, locations, units, services, medications, and clinical terminology are checked before migration or integration. This is quiet work, but its impact is large.

**Third, building modules incrementally.** Facility teams can try the core flow first. Feedback from doctors, nurses, registration staff, and pharmacy is used to improve how the system works.

**Fourth, preparing interoperability.** FHIR mapping, authentication, validation, sandbox testing, error handling, and monitoring are arranged following the relevant SATUSEHAT playbook.

**Fifth, accompanying go-live.** In the early weeks, small problems need to be handled quickly. Sometimes it is not a bug, but a confusing term or a button order that does not match the service rhythm.

This approach does involve more listening. For healthcare, that is a necessity.

## The Measures of Success We Look For

We are careful with promises like “all processes become 10 times faster”. Healthcare facilities are too complex to be summarised into a single number.

More reasonable measures are things that can be felt and checked:

- staff no longer type patient identities multiple times;
- doctors can find important history without opening many applications;
- laboratory results and prescriptions are linked to the correct visit;
- pharmacy teams have a trace of stock movement;
- management gets reports from the same data source;
- integration teams can see delivery status and fix errors;
- the facility has a foundation that is more ready to follow Ministry standards.

Good digitalisation often feels ordinary after it is used. Queues move, data is found, prescriptions arrive, test results are visible, and reports are generated. There is no technology show. The system just works.

## Building Digital Healthcare in Indonesia, One Usable System at a Time

National health transformation requires large platforms like SATUSEHAT. But the national platform still needs thousands of systems in hospitals, clinics, laboratories, pharmacies, and other facilities that can produce quality data.

It is in that space that Codeverta works.

We help healthcare facilities build operational systems that are close to user needs while also preparing data structures and integration infrastructure that follow the direction of the Ministry of Health. The goal is not merely to pass an API connection. The goal is to make data move correctly without disrupting patient services.

If your facility is preparing RME, improving clinic or hospital systems, connecting pharmacy and laboratory, or planning SATUSEHAT integration, Codeverta can help from process mapping to implementation and technical support.

Because in the end, good healthcare technology is not the most talked about. Good technology is what gives healthcare professionals more time to care for people.
