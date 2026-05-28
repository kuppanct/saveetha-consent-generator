/**
 * Urology Consent Generator - Procedures Database
 * Contains clinical data, risks, and benefits for 95 urological procedures,
 * and compiles them into medicolegally watertight consent texts.
 */

const URO_CATEGORIES = [
    { id: "cat1", name: "1. Bedside, Diagnostic, & Minor Office Procedures" },
    { id: "cat2", name: "2. Endourology & Outpatient Core Packages" },
    { id: "cat3", name: "3. Stone Disease" },
    { id: "cat4", name: "4. Reconstructive & Functional Urology" },
    { id: "cat5", name: "5. Andrology & Infertility" },
    { id: "cat6", name: "6. Uro-Oncology" },
    { id: "cat7", name: "7. Renal Transplantation" }
];

const URO_PROCEDURES = {
    "FOLEY": {
        name: "Simple Catheterisation (Foley)",
        category: "cat1",
        diagnosis: "Urinary Retention / Inability to void urine",
        benefits: "Decompression of the bladder, relief of painful urinary retention, monitoring of urine output.",
        alternatives: "Suprapubic catheterization, clean intermittent self-catheterization (CISC), or conservative monitoring.",
        risks: [
            "Urinary tract infection (UTI) or urosepsis requiring antibiotics.",
            "Urethral injury, mucosal bleeding (hematuria), or creation of a false passage.",
            "Bladder spasms, localized pain, or bypassing of urine around the catheter.",
            "Long-term urethral stricture (narrowing of the urine pipe) due to mechanical irritation.",
            "Catheter block or encrustation necessitating emergency changes.",
            "Severe urethral disruption or tearing; creation of a false passage; balloon inflation inside the urethral lumen causing severe injury; urosepsis leading to septic shock."
        ],
        hasCatheter: true
    },
    "UROFLOWMETRY": {
        name: "Uroflowmetry",
        category: "cat1",
        diagnosis: "Lower Urinary Tract Symptoms (LUTS) evaluation",
        benefits: "Non-invasive assessment of urine flow rate and voiding pattern to diagnose obstruction.",
        alternatives: "Manual voiding chart, post-void residual measurement by ultrasound, or urodynamic study.",
        risks: [
            "Non-invasive procedure with negligible clinical risks.",
            "Possible anxiety or failure to void under test conditions requiring repeat testing."
        ]
    },
    "UDS": {
        name: "Multichannel Urodynamic Studies (UDS)",
        category: "cat1",
        diagnosis: "Voiding dysfunction / Neurogenic bladder / Urinary incontinence",
        benefits: "Detailed diagnostic evaluation of bladder pressure, capacity, and urethral sphincter function.",
        alternatives: "Non-invasive uroflowmetry, frequency-volume chart, or empirical treatment.",
        risks: [
            "Urinary tract infection (UTI) due to catheter insertion.",
            "Transient dysuria (pain during urination) or mild hematuria (blood in urine).",
            "Urethral or bladder trauma during catheter insertion.",
            "Autonomic dysreflexia (in spinal cord injury patients) causing high blood pressure.",
            "Bladder rupture or bladder perforation (rare but documented); autonomic dysreflexia in spinal cord patients leading to malignant hypertension or stroke."
        ],
        hasCatheter: true
    },
    "VUDS": {
        name: "Video-Urodynamics",
        category: "cat1",
        diagnosis: "Complex voiding dysfunction / Neurogenic bladder bladder neck obstruction",
        benefits: "Combined pressure-flow study and fluoroscopic visualization of the lower urinary tract.",
        alternatives: "Standard urodynamic study, voiding cystourethrogram (VCUG), or cystoscopy.",
        risks: [
            "Radiation exposure (minimal, within standard diagnostic limits).",
            "Urinary tract infection (UTI) or urosepsis.",
            "Allergic reaction to the contrast medium used.",
            "Transient pain, burning on urination, or hematuria.",
            "Bladder rupture or bladder perforation (rare but documented); contrast-induced anaphylaxis or acute kidney injury; autonomic dysreflexia in spinal cord patients leading to malignant hypertension or stroke."
        ],
        hasCatheter: true
    },
    "INTRAVESICAL_INSTILLATION": {
        name: "Intravesical Instillations (BCG / Mitomycin C / Gemcitabine)",
        category: "cat1",
        diagnosis: "Non-Muscle Invasive Bladder Cancer (NMIBC) / Interstitial cystitis",
        benefits: "Direct local chemotherapy/immunotherapy to prevent tumor recurrence or treat chronic inflammation.",
        alternatives: "Systemic therapy, radical surgery, or close surveillance cystoscopy.",
        risks: [
            "Chemical cystitis causing severe urinary urgency, frequency, and painful urination.",
            "Hematuria or passing of tissue debris.",
            "Systemic BCG infection (BCGosis) causing high fever, joint pain, or liver involvement (requires anti-tubercular drugs).",
            "Urethral stricture or contracture of the bladder capacity over time.",
            "BCG-osis (systemic tuberculous sepsis) causing granulomatous hepatitis, pneumonitis, or death; bladder wall necrosis requiring emergency radical cystectomy."
        ],
        hasCatheter: true
    },
    "TRUS_BIOPSY": {
        name: "Transrectal Ultrasound (TRUS) Guided Prostate Biopsy",
        gender: "Male",
        category: "cat1",
        diagnosis: "Elevated PSA / Suspected Prostate Cancer",
        benefits: "Accurate tissue diagnosis of prostate pathology under real-time ultrasound guidance.",
        alternatives: "Transperineal biopsy, MRI-guided biopsy, active surveillance, or repeat PSA monitoring.",
        risks: [
            "Infection and severe urosepsis (even with prophylactic antibiotics) requiring hospitalization.",
            "Rectal bleeding (rectorrhagia) or hematuria lasting for several days.",
            "Hemospermia (blood in semen) for up to 4-6 weeks.",
            "Acute urinary retention requiring temporary catheterization.",
            "Life-threatening septic shock from enteric pathogens (even with antibiotics); massive rectal hemorrhage requiring emergency rectal packing or arterial embolization; persistent erectile dysfunction."
        ],
        hasCatheter: true
    },
    "TRANSPERINEAL_BIOPSY": {
        name: "Transperineal Template Prostate Biopsy",
        gender: "Male",
        category: "cat1",
        diagnosis: "Elevated PSA / Suspected Prostate Cancer / Negative previous TRUS biopsy",
        benefits: "Systematic sampling of the prostate gland through the perineum, minimizing rectal infection risk.",
        alternatives: "TRUS biopsy, active surveillance, or MRI surveillance.",
        risks: [
            "Perineal hematoma or pain at the puncture site.",
            "Hematuria or hematospermia.",
            "Acute urinary retention (higher risk than transrectal route) requiring temporary catheterization.",
            "Urinary tract infection (lower risk than transrectal) or perineal abscess."
        ],
        isMajorSurgery: true,
        hasCatheter: true
    },
    "CAVERNOSAL_ASPIRATION": {
        name: "Cavernosal Aspiration and Injection (for Priapism)",
        category: "cat1",
        diagnosis: "Ischemic Priapism (prolonged painful erection)",
        benefits: "Aspiration of stagnant blood and injection of sympathomimetics to restore penile blood flow and prevent necrosis.",
        alternatives: "Surgical shunting procedures (Winter's, Al-Ghorab, or open shunt) if aspiration fails.",
        risks: [
            "Penile hematoma or bleeding from puncture sites.",
            "Infection of the erectile tissue (cavernositis) or skin.",
            "Permanent erectile dysfunction due to prolonged ischemia or tissue fibrosis.",
            "Systemic absorption of drugs (e.g., phenylephrine) causing hypertensive crisis or cardiac arrhythmia."
        ]
    },
    "PARAPHIMOSIS_REDUCTION": {
        name: "Reduction of Paraphimosis",
        gender: "Male",
        category: "cat1",
        diagnosis: "Paraphimosis (trapped retracted foreskin)",
        benefits: "Relief of penile strangulation, restoration of venous return, and prevention of glans necrosis.",
        alternatives: "Dorsal slit procedure or immediate formal circumcision.",
        risks: [
            "Pain and bruising of the penis.",
            "Foreskin tear, skin necrosis, or ulceration.",
            "Failure of manual reduction requiring immediate surgical dorsal slit."
        ]
    },
    "MALE_CYSTOSCOPY": {
        name: "Cystoscopy and Proceed (Diagnostic)",
        gender: "Male",
        category: "cat2",
        diagnosis: "Hematuria / LUTS / Bladder Mass / Suspected urethral stricture",
        benefits: "Direct endoscopic visualization of the urethra, prostate, bladder neck, and bladder cavity.",
        alternatives: "CT urogram, ultrasound, or magnetic resonance imaging (MRI).",
        risks: [
            "Dysuria and mild hematuria for 24-48 hours.",
            "Urinary tract infection or acute urosepsis.",
            "Urethral injury, false passage, or sphincteric trauma.",
            "Need to proceed to intervention (biopsy, stone removal) if findings warrant."
        ]
    },
    "MALE_SPC": {
        name: "Suprapubic Cystostomy (SPC)",
        gender: "Male",
        category: "cat2",
        diagnosis: "Acute / Chronic urinary retention with failed urethral catheterization",
        benefits: "Direct bladder drainage through the lower abdominal wall, bypassing the urethra.",
        alternatives: "Urethral catheterization under endoscopy, or open cystostomy.",
        risks: [
            "Bowel injury (perforation of bowel loops) requiring emergency open laparotomy.",
            "Bleeding into the bladder (clot retention) or rectus sheath hematoma.",
            "Catheter displacement, blockage, or leakage around the tube.",
            "Chronic bladder spasm or bladder calculus formation."
        ],
        hasCatheter: true
    },
    "MALE_BNI": {
        name: "Bladder Neck Incision (BNI)",
        gender: "Male",
        category: "cat2",
        diagnosis: "Bladder Neck Stenosis / Primary Bladder Neck Obstruction",
        benefits: "Incising the tight bladder neck endoscopically to restore normal voiding pressures.",
        alternatives: "Alpha-blocker medication, intermittent dilation, or clean self-catheterization.",
        risks: [
            "Retrograde ejaculation (semen traveling into the bladder, causing dry orgasm/subfertility).",
            "Bleeding requiring clot evacuation or blood transfusion.",
            "Recurrent bladder neck contracture requiring repeat surgery.",
            "Urinary incontinence (temporary or permanent) due to sphincter damage."
        ],
        isMajorSurgery: true,
        hasCatheter: true
    },
    "MALE_URETHRAL_DILATATION": {
        name: "Urethral Dilatation",
        gender: "Male",
        category: "cat2",
        diagnosis: "Urethral Stricture Disease",
        benefits: "Mechanical dilation of the narrowed urethral lumen to improve urine flow.",
        alternatives: "Optical Internal Urethrotomy (OIU), urethroplasty, or permanent suprapubic catheter.",
        risks: [
            "Urethral tear, false passage formation, or severe bleeding.",
            "High recurrence rate of stricture, necessitating regular self-dilatation.",
            "Urosepsis or bacteremia during dilation.",
            "Sphincter injury causing urinary incontinence.",
            "Complete urethral avulsion; severe perineal extravasation of fluid (water-logged scrotum/perineum); permanent sphincter destruction causing total incontinence."
        ],
        hasCatheter: true
    },
    "TURP": {
        name: "Transurethral Resection of the Prostate (TURP)",
        gender: "Male",
        category: "cat2",
        diagnosis: "Benign Prostatic Hyperplasia (BPH) with bladder outflow obstruction",
        benefits: "Endoscopic removal of obstructing prostate tissue to restore normal urinary flow.",
        alternatives: "Medical therapy (combodart/tamsulosin), Rezum, HoLEP, open prostatectomy, or permanent catheter.",
        risks: [
            "TUR Syndrome (dilutional hyponatremia) causing confusion, seizures, or heart failure (specific to monopolar saline-free glycine irrigation).",
            "Severe hemorrhage requiring blood transfusion or re-exploration.",
            "Retrograde ejaculation (occurs in >75% of cases).",
            "Urethral stricture or bladder neck stenosis in the long term.",
            "Temporary or permanent urinary incontinence (due to external sphincter injury).",
            "TUR Syndrome (dilutional hyponatremia) causing cerebral edema, seizures, coma, or death (specific to monopolar saline-free glycine irrigation); capsule perforation with extraperitoneal/intraperitoneal irrigation fluid absorption; rectourethral fistula; permanent urinary incontinence (due to total external sphincter destruction)."
        ],
        isMajorSurgery: true,
        hasCatheter: true
    },
    "CIRCUMCISION": {
        name: "Conventional / Stapler Circumcision",
        approachOptions: ["Conventional", "Stapler"],
        gender: "Male",
        category: "cat2",
        diagnosis: "Phimosis / Paraphimosis / Recurrent Balanoposthitis",
        benefits: "Surgical removal of the foreskin to eliminate tightness, infection, and poor hygiene.",
        alternatives: "Steroid creams, dorsal slit, or observation.",
        risks: [
            "Bleeding or hematoma requiring suture placement.",
            "Wound infection or dehiscence.",
            "Injury to the glans penis or urethra (meatal stenosis).",
            "Cosmetic dissatisfaction or removal of excess/insufficient skin."
        ]
    },
    "MEATOTOMY": {
        name: "Meatotomy / Meatoplasty",
        approachOptions: ["Meatotomy", "Meatoplasty"],
        category: "cat2",
        diagnosis: "Meatal Stenosis (narrowing of the urethral opening)",
        benefits: "Surgical widening of the external urethral meatus to correct a high-velocity stream and voiding difficulty.",
        alternatives: "Intermittent dilatation or observation.",
        risks: [
            "Bleeding from the meatal edges.",
            "Recurrent stenosis requiring regular dilation or repeat meatoplasty.",
            "Spraying of the urinary stream."
        ]
    },
    "OIU": {
        name: "Optical Internal Urethrotomy (OIU)",
        category: "cat2",
        diagnosis: "Urethral Stricture",
        benefits: "Direct endoscopic incision of urethral scar tissue to open the urinary passage.",
        alternatives: "Urethral dilatation, urethroplasty, or perineal urethrostomy.",
        risks: [
            "High recurrence rate (often >50% within 1-2 years).",
            "Urethral bleeding or perineal extravasation of irrigation fluid.",
            "Erectile dysfunction or chordee (penile curvature) if incision extends into corpus cavernosum.",
            "Urosepsis or urinary tract infection.",
            "Complete urethral avulsion; severe perineal extravasation of fluid (water-logged scrotum/perineum); permanent sphincter destruction causing total incontinence."
        ],
        isMajorSurgery: true,
        hasCatheter: true
    },
    "TURBT": {
        name: "Transurethral Resection of Bladder Tumor (TURBT / ERBT)",
        approachOptions: ["TURBT", "ERBT"],
        category: "cat2",
        diagnosis: "Bladder Tumor / Mass",
        benefits: "Complete endoscopic resection of bladder tumor for diagnostic staging and therapeutic clearance.",
        alternatives: "Partial or radical cystectomy, systemic chemotherapy, or immunotherapy.",
        risks: [
            "Bladder perforation (extraperitoneal or intraperitoneal) potentially requiring open surgical repair.",
            "Severe bleeding requiring blood transfusion or clot evacuation.",
            "Obturator nerve reflex during resection leading to thigh twitching and perforation risk.",
            "Tumor recurrence requiring adjuvant intravesical therapy (BCG/Mitomycin).",
            "Intraperitoneal bladder perforation with bowel injury, peritonitis, or tumor seeding; severe primary or delayed secondary hemorrhage requiring emergency cystectomy or arterial embolization; obturator nerve reflex leading to major vessel tear."
        ],
        isMajorSurgery: true,
        hasCatheter: true
    },
    "CYSTOLITHOLAPAXY": {
        name: "Cystolitholapaxy (Laser / Pneumatic)",
        approachOptions: ["Laser", "Pneumatic"],
        category: "cat2",
        diagnosis: "Urinary Bladder Calculus (Stone)",
        benefits: "Endoscopic fragmentation and removal of bladder stones.",
        alternatives: "Open cystolithotomy, percutaneous cystolithotomy, or observation.",
        risks: [
            "Bladder mucosal injury, bleeding, or bladder wall perforation.",
            "Retained stone fragments requiring secondary procedures.",
            "Urinary tract infection or urosepsis.",
            "Urethral trauma or stricture due to scope passage.",
            "Bladder rupture/perforation; direct thermal or mechanical injury to ureteric orifices causing permanent ureteric stricture or reflux; severe urethral tearing."
        ],
        isMajorSurgery: true,
        hasCatheter: true
    },
    "TUIP": {
        name: "Transurethral Incision of the Prostate (TUIP)",
        gender: "Male",
        category: "cat2",
        diagnosis: "Small prostate with bladder outflow obstruction",
        benefits: "Incision of the prostate and bladder neck without resecting tissue, preserving ejaculation in many.",
        alternatives: "TURP, medical management, or permanent catheter.",
        risks: [
            "Retrograde ejaculation (lower risk than TURP, but still possible).",
            "Bleeding or urinary tract infection.",
            "Recurrence of obstruction requiring repeat intervention."
        ],
        isMajorSurgery: true,
        hasCatheter: true
    },
    "MALE_IMPLANTS": {
        name: "Minimally Invasive Implants (Rezum / UroLift)",
        approachOptions: ["Rezum", "UroLift"],
        gender: "Male",
        category: "cat2",
        diagnosis: "Benign Prostatic Hyperplasia (BPH)",
        benefits: "Preservation of sexual function and rapid relief of LUTS using steam therapy (Rezum) or mechanical clips (UroLift).",
        alternatives: "TURP, medication, or observation.",
        risks: [
            "Transient dysuria, urgency, hematuria, or pelvic discomfort.",
            "Urinary retention requiring short-term catheterization.",
            "Device infection, migration, or failure to resolve symptoms requiring conversion to TURP."
        ],
        hasCatheter: true
    },
    "MALE_FB_REMOVAL": {
        name: "Removal of Foreign Body from Bladder / Urethra",
        gender: "Male",
        category: "cat2",
        diagnosis: "Intravesical / Intraurethral Foreign Body",
        benefits: "Endoscopic extraction of foreign objects to prevent bladder infection, stones, or perforation.",
        alternatives: "Open cystotomy or urethrotomy.",
        risks: [
            "Severe urethral or bladder laceration.",
            "Inability to extract endoscopically, requiring open surgical conversion.",
            "Post-operative urethral stricture or bladder spasm.",
            "Severe cystitis or pelvic osteomyelitis if object has eroded tissues."
        ],
        isMajorSurgery: true,
        hasCatheter: true
    },
    "MALE_CYSTOSCOPY_PROCEED_COMBINED": {
        name: "Cystoscopy and Proceed",
        gender: "Male",
        category: "cat2",
        diagnosis: "Bladder Outflow Obstruction / Hematuria / Bladder Mass / Urethral Stricture under evaluation",
        benefits: "Direct visualization and single-session therapeutic correction of any bladder, urethral, or prostatic pathology encountered.",
        alternatives: "Staged diagnostic cystoscopy followed by separate scheduled treatment sessions under repeated anesthesia.",
        risks: [
            "Severe hemorrhage requiring blood transfusion or clot evacuation.",
            "TUR Syndrome (dilutional hyponatremia) or fluid absorption causing confusion/cardiac distress (specific to saline-free irrigation).",
            "Retrograde ejaculation (dry orgasm) in >75% if prostate tissue is resected.",
            "Bladder perforation (extraperitoneal or intraperitoneal) or urethral false passage requiring open surgery to repair.",
            "Recurrent stricture (urethral stricture or bladder neck stenosis) requiring secondary procedures.",
            "Urinary tract infection or severe life-threatening urosepsis.",
            "Urinary incontinence (temporary or permanent) due to sphincter damage.",
            "Meatal stenosis or skin healing delay if circumcision/meatotomy is performed.",
            "Retained stone fragments requiring secondary procedures."
        ],
        isMajorSurgery: true,
        hasCatheter: true,
        hasStent: true
    },
    "FEMALE_CYSTOSCOPY": {
        name: "Cystoscopy and Proceed (Diagnostic)",
        gender: "Female",
        category: "cat2",
        diagnosis: "Hematuria / Recurrent UTI / Suspicious bladder symptoms",
        benefits: "Direct endoscopic inspection of female urethra, bladder neck, and bladder.",
        alternatives: "Non-invasive imaging (ultrasound, CT, MRI).",
        risks: [
            "Transient painful urination (burning) and mild hematuria.",
            "Urinary tract infection (UTI) requiring antibiotics.",
            "Bladder spasm or urethral irritation."
        ]
    },
    "FEMALE_DILATATION": {
        name: "Urethral / Bladder Neck Dilatation",
        gender: "Female",
        category: "cat2",
        diagnosis: "Female Urethral Stenosis / Bladder Neck Obstruction",
        benefits: "Dilation of female urethra to improve flow and resolve high post-void residuals.",
        alternatives: "Clean self-catheterization or reconstructive urethroplasty.",
        risks: [
            "Bleeding or urethral mucosal tear.",
            "Urinary tract infection or urosepsis.",
            "Temporary urinary incontinence due to sphincter stretching."
        ],
        hasCatheter: true
    },
    "FEMALE_HYDRODISTENTION": {
        name: "Bladder Hydrodistention (for Interstitial Cystitis)",
        gender: "Female",
        category: "cat2",
        diagnosis: "Interstitial Cystitis / Bladder Pain Syndrome",
        benefits: "Therapeutic stretching of the bladder under anesthesia to relieve pain and increase capacity; diagnostic for Hunner's ulcers.",
        alternatives: "Oral medications, intravesical instillations, or neuromodulation.",
        risks: [
            "Bladder rupture (perforation) requiring immediate open abdominal surgery.",
            "Severe post-operative pain flare-up.",
            "Transient hematuria or urinary retention."
        ],
        isMajorSurgery: true,
        hasCatheter: true
    },
    "FEMALE_BIOPSY": {
        name: "Cold Cup / Punch Bladder Biopsy",
        approachOptions: ["Cold Cup", "Punch"],
        gender: "Female",
        category: "cat2",
        diagnosis: "Suspected Bladder Pathology / Mucosal lesion",
        benefits: "Pathological diagnosis of bladder mucosal abnormalities.",
        alternatives: "Cystoscopic surveillance or urine cytology.",
        risks: [
            "Bladder wall perforation.",
            "Hematuria and clot retention.",
            "Urinary tract infection or urosepsis."
        ],
        hasCatheter: true
    },
    "FEMALE_SPC": {
        name: "Suprapubic Cystostomy (SPC)",
        gender: "Female",
        category: "cat2",
        diagnosis: "Acute urinary retention / Neurogenic bladder / Failed urethral access",
        benefits: "Bypassing the female urethra for clean urinary drainage via lower abdomen.",
        alternatives: "Urethral catheter or reconstructive surgery.",
        risks: [
            "Bowel perforation (higher risk if prior pelvic surgery).",
            "Bleeding, hematoma, or catheter displacement.",
            "Chronic spasms or leakage around site."
        ],
        hasCatheter: true
    },
    "FEMALE_CARUNCLE": {
        name: "Excision of Urethral Caruncle",
        gender: "Female",
        category: "cat2",
        diagnosis: "Symptomatic Urethral Caruncle (bleeding/pain)",
        benefits: "Surgical removal of the painful vascular mass at the urethral opening.",
        alternatives: "Topical estrogen creams, steroid creams, or observation.",
        risks: [
            "Bleeding from the excision site.",
            "Urethral meatal stenosis (narrowing) or scarring.",
            "Pain on urination or temporary urinary retention."
        ]
    },
    "FEMALE_CYSTOSCOPY_PROCEED_COMBINED": {
        name: "Cystoscopy and Proceed",
        gender: "Female",
        category: "cat2",
        diagnosis: "Hematuria / Recurrent UTI / Bladder Mass / Voiding Dysfunction under evaluation",
        benefits: "Diagnostic mapping and single-session therapeutic intervention for encountered bladder, urethral, or ureteral pathology.",
        alternatives: "Staged diagnostic evaluation and delayed intervention under separate anesthesia.",
        risks: [
            "Bladder wall perforation (extra- or intra-peritoneal) or urethral injury requiring open surgical repair.",
            "Severe bleeding, hematuria, or vaginal spotting.",
            "Urinary tract infection or urosepsis.",
            "Temporary or permanent urinary incontinence due to urethral sphincter stretching.",
            "Bladder rupture (during hydrodistention) or severe post-operative pelvic pain flare-up.",
            "Urethral meatal stenosis or scarring after caruncle excision.",
            "Ureteral injury if biopsy or resection is near ureteric orifices."
        ],
        isMajorSurgery: true,
        hasCatheter: true,
        hasStent: true
    },
    "RIRS_UNILATERAL": {
        name: "Unilateral Retrograde Intrarenal Surgery (RIRS) with Unilateral DJS",
        category: "cat3",
        diagnosis: "Renal / Ureteric Calculus (Unilateral)",
        benefits: "Minimally invasive fragmentation of kidney stones using flexible scope and holmium/thulium laser.",
        alternatives: "Conservative management, ESWL, PCNL, or open surgery.",
        risks: [
            "Infection and severe urosepsis requiring ICU care.",
            "Ureteral injury (mucosal tear, perforation, or avulsion/tearing) requiring stent, open reconstruction, or nephrectomy.",
            "Ureteral stricture (delayed scarring) requiring balloon dilation or reconstruction.",
            "Incomplete stone clearance requiring staged secondary procedures.",
            "Complete ureteral avulsion (tearing away of the ureter from the kidney or bladder) requiring emergency open laparotomy, ileal ureter substitution, or autotransplantation; loss of the kidney (nephrectomy); subcapsular renal hematoma or renal rupture."
        ],
        isMajorSurgery: true,
        hasStent: true
    },
    "RIRS_BILATERAL": {
        name: "Bilateral Retrograde Intrarenal Surgery (RIRS) with Bilateral DJS",
        category: "cat3",
        diagnosis: "Bilateral Renal / Ureteric Calculi",
        benefits: "Single-anesthesia bilateral clearance of kidney stones.",
        alternatives: "Staged unilateral RIRS, bilateral ESWL, or unilateral PCNL.",
        risks: [
            "Higher risk of bilateral ureteral edema or injury leading to transient anuria (no urine output) or acute renal failure.",
            "Increased risk of systemic inflammatory response (SIRS) and severe urosepsis.",
            "Bilateral ureteral injury, stricture, or perforation.",
            "Prolonged operative time and increased anesthetic risk.",
            "Bilateral ureteral injury, bilateral spasms, or bilateral mucosal edema leading to acute anuria (no urine output), acute renal failure, and temporary or permanent hemodialysis; higher rate of systemic inflammatory response (SIRS) and septic shock."
        ],
        isMajorSurgery: true,
        hasStent: true,
        isBilateral: true
    },
    "URSL_UNILATERAL": {
        name: "Unilateral Ureteroscopic Lithotripsy (URSL) with Unilateral DJS",
        category: "cat3",
        diagnosis: "Ureteric Calculus (Unilateral)",
        benefits: "Endoscopic fragmentation of ureteral stone using rigid/semi-rigid scope.",
        alternatives: "Conservative medical expulsion therapy, ESWL, RIRS, or open ureterolithotomy.",
        risks: [
            "Ureteral perforation or mucosal tearing.",
            "Ureteral avulsion (complete pulling out of the ureter) requiring emergency open reconstruction (ileal ureter or autotransplantation).",
            "Stone migration upward into the kidney (requiring RIRS or stent placement).",
            "Delayed ureteral stricture formation.",
            "Complete ureteral avulsion (tearing away of the ureter from the kidney or bladder) requiring emergency open laparotomy, ileal ureter substitution, or autotransplantation; loss of the kidney (nephrectomy); subcapsular renal hematoma or renal rupture."
        ],
        isMajorSurgery: true,
        hasStent: true
    },
    "URSL_BILATERAL": {
        name: "Bilateral Ureteroscopic Lithotripsy (URSL) with Bilateral DJS",
        category: "cat3",
        diagnosis: "Bilateral Ureteric Calculi",
        benefits: "Bilateral ureteral stone clearance in a single session.",
        alternatives: "Staged unilateral URSL, bilateral ESWL, or nephrostomy tubes.",
        risks: [
            "Bilateral ureteral spasms, mucosal edema, or injury leading to acute renal failure.",
            "Severe post-operative fever, UTI, or life-threatening urosepsis.",
            "Increased incidence of stent-related pain, urgency, and hematuria.",
            "Bilateral ureteral injury, bilateral spasms, or bilateral mucosal edema leading to acute anuria (no urine output), acute renal failure, and temporary or permanent hemodialysis; higher rate of systemic inflammatory response (SIRS) and septic shock."
        ],
        isMajorSurgery: true,
        hasStent: true,
        isBilateral: true
    },
    "URS_UNILATERAL_ALONE": {
        name: "Unilateral Ureteroscopy (URS) with Unilateral DJS Placement",
        category: "cat3",
        diagnosis: "Ureteric Stricture / Ureteric Obstruction / Ureteral narrowing",
        benefits: "Direct endoscopic inspection of the ureter and placement of an internal stent to bypass obstruction and ensure urinary drainage.",
        alternatives: "Percutaneous Nephrostomy (PCN) tube placement, conservative observation, or open reconstruction.",
        risks: [
            "Ureteral injury (mucosal tear, perforation, or complete avulsion) requiring open surgery.",
            "Sepsis or severe urinary tract infection (UTI) requiring antibiotics.",
            "Hematuria (blood in urine) or temporary ureteral spasms.",
            "Ureteral stricture (scarring) in the long term.",
            "Inability to pass the scope or stent, requiring alternative drainage (e.g. PCN)."
        ],
        isMajorSurgery: true,
        hasStent: true
    },
    "URS_BILATERAL_ALONE": {
        name: "Bilateral Ureteroscopy (URS) with Bilateral DJS Placement",
        category: "cat3",
        diagnosis: "Bilateral Ureteric Obstruction / Bilateral Hydronephrosis / Anuria",
        benefits: "Bilateral endoscopic ureteral inspection and bilateral stent drainage to restore renal function and relieve obstruction.",
        alternatives: "Bilateral PCN tube placement or staged procedures.",
        risks: [
            "Bilateral ureteral injury, mucosal tear, or perforation.",
            "High risk of post-operative bilateral ureteral edema leading to transient renal impairment or anuria.",
            "Severe post-operative fever, urinary tract infection, or urosepsis.",
            "Bilateral ureteral spasms, flank pain, and bladder urgency.",
            "Stricture formation in both ureters."
        ],
        isMajorSurgery: true,
        hasStent: true,
        isBilateral: true
    },
    "PCNL_UNILATERAL": {
        name: "Percutaneous Nephrolithotomy (PCNL) with Unilateral DJS / Nephrostomy",
        approachOptions: ["DJS", "Nephrostomy"],
        category: "cat3",
        diagnosis: "Large / Staghorn Renal Calculus (Unilateral)",
        benefits: "Direct removal of large stones through a small keyhole incision in the back.",
        alternatives: "RIRS, open/laparoscopic nephrolithotomy, or ESWL.",
        risks: [
            "Severe hemorrhage from renal parenchymal puncture requiring blood transfusion, emergency angioembolization (clotting of bleeding vessel), or nephrectomy.",
            "Adjacent organ injury: pleural cavity injury (causing pneumothorax or hydrothorax requiring a chest tube), colonic perforation, or injury to spleen/liver.",
            "Urosepsis or septic shock due to absorption of pressurized irrigation fluid.",
            "Hydro-nephrosis or extravasation of fluid into the retroperitoneum.",
            "Catastrophic renal hemorrhage requiring emergency angioembolization, renal packing, or emergency nephrectomy (loss of kidney); colonic perforation with fecal contamination requiring bowel resection and temporary stoma; pleural cavity injury (pneumothorax/hemothorax) requiring chest tube or thoracotomy; liver or spleen laceration."
        ],
        isMajorSurgery: true,
        hasStent: true,
        hasNephrostomy: true
    },
    "PCNL_BILATERAL": {
        name: "Percutaneous Nephrolithotomy (PCNL) with Bilateral DJS / Nephrostomy",
        approachOptions: ["DJS", "Nephrostomy"],
        category: "cat3",
        diagnosis: "Bilateral Large Renal Calculi",
        benefits: "Bilateral renal stone clearance under single anesthesia (usually staged but occasionally simultaneous).",
        alternatives: "Staged unilateral PCNL, bilateral RIRS, or open surgery.",
        risks: [
            "High risk of fluid overload, hypothermia, and prolonged anesthesia.",
            "Bilateral renal bleeding or bilateral nephrostomy tube displacement.",
            "Bilateral pleural injury or severe post-operative respiratory compromise.",
            "Increased risk of acute kidney injury (AKI) due to bilateral parenchymal trauma.",
            "Bilateral renal hemorrhage; bilateral pleural injury; acute bilateral kidney injury (AKI) requiring hemodialysis; severe hypothermia and fluid overload from bilateral pressurized irrigation."
        ],
        isMajorSurgery: true,
        hasStent: true,
        hasNephrostomy: true,
        isBilateral: true
    },
    "ECIRS": {
        name: "Endoscopic Combined Intrarenal Surgery (ECIRS)",
        category: "cat3",
        diagnosis: "Complex / Staghorn Renal and Ureteric Calculus",
        benefits: "Simultaneous combined antegrade (PCNL) and retrograde (RIRS) endoscopic approach to maximize stone clearance.",
        alternatives: "Standard PCNL alone, staged RIRS alone, or open surgery.",
        risks: [
            "Combined risks of PCNL and RIRS.",
            "Severe renal bleeding requiring transfusion or angioembolization.",
            "Ureteral injury or perforation due to dual scope access.",
            "Severe sepsis due to prolonged irrigation under dual pressure."
        ],
        isMajorSurgery: true,
        hasStent: true,
        hasNephrostomy: true
    },
    "SBES": {
        name: "Simultaneous Bilateral Endoscopic Surgery (SBES)",
        category: "cat3",
        diagnosis: "Bilateral complex renal/ureteric stones",
        benefits: "Simultaneous endoscopic procedures on both kidneys/ureters by two surgical teams to reduce anesthesia time.",
        alternatives: "Staged bilateral endoscopic surgeries.",
        risks: [
            "High risk of systemic inflammatory response (SIRS) and septic shock.",
            "Combined bilateral injuries (pleural, ureteral, renal parenchyma).",
            "Anesthetic risks associated with complex positioning (prone/split-leg).",
            "Bilateral renal hemorrhage; bilateral pleural injury; acute bilateral kidney injury (AKI) requiring hemodialysis; severe hypothermia and fluid overload from bilateral pressurized irrigation."
        ],
        isMajorSurgery: true,
        hasStent: true,
        hasNephrostomy: true,
        isBilateral: true
    },
    "ENDOPYELOTOMY_UNILATERAL": {
        name: "Unilateral Endopyelotomy with Unilateral DJS",
        category: "cat3",
        diagnosis: "Ureteropelvic Junction Obstruction (UPJO) - Primary or Secondary",
        benefits: "Endoscopic incision of the narrowed UPJ (using laser or cutting balloon) to relieve kidney obstruction.",
        alternatives: "Laparoscopic/robotic pyeloplasty, open pyeloplasty, or balloon dilation.",
        risks: [
            "Hemorrhage from the crossing renal vessels (crossing artery) requiring transfusion or embolization.",
            "Incomplete relief of obstruction (recurrence rate >20-30%, higher than pyeloplasty).",
            "Urinoma (urine leak into surrounding tissues) or retroperitoneal abscess."
        ],
        isMajorSurgery: true,
        hasStent: true
    },
    "ENDOPYELOTOMY_BILATERAL": {
        name: "Bilateral Endopyelotomy with Bilateral DJS",
        category: "cat3",
        diagnosis: "Bilateral Ureteropelvic Junction Obstruction",
        benefits: "Bilateral endoscopic correction of UPJ obstruction under single anesthesia.",
        alternatives: "Bilateral laparoscopic pyeloplasty (usually staged) or nephrostomy tubes.",
        risks: [
            "Bilateral crossing vessel injury or severe bleeding.",
            "High risk of bilateral recurrent obstruction leading to renal impairment.",
            "Bilateral ureteral leakage or retroperitoneal urinoma."
        ],
        isMajorSurgery: true,
        hasStent: true,
        isBilateral: true
    },
    "RPG_UNILATERAL": {
        name: "Unilateral Retrograde Pyelogram (RPG) with Unilateral DJS Placement",
        category: "cat3",
        diagnosis: "Ureteric obstruction / Hydronephrosis of unknown etiology / Ureteric leak",
        benefits: "Fluoroscopic visualization of ureteral anatomy and placement of a protective internal drainage stent.",
        alternatives: "Antegrade nephrostogram, percutaneous nephrostomy, or MRI urogram.",
        risks: [
            "Ureteral perforation by the guidewire or catheter.",
            "Inability to bypass the obstruction, requiring emergency PCN tube placement.",
            "Contrast extravasation or allergic reaction.",
            "Sepsis due to injection of contrast under pressure in an obstructed system."
        ],
        isMajorSurgery: true,
        hasStent: true
    },
    "RPG_BILATERAL": {
        name: "Bilateral Retrograde Pyelogram (RPG) with Bilateral DJS Placement",
        category: "cat3",
        diagnosis: "Bilateral ureteric obstruction / Bilateral hydronephrosis / Anuria",
        benefits: "Bilateral diagnostic imaging and stent drainage to relieve acute renal failure.",
        alternatives: "Bilateral PCN tube placement.",
        risks: [
            "Bilateral ureteral injury or failure to bypass both sides.",
            "Contrast-induced nephropathy or acute kidney injury.",
            "Severe post-procedural sepsis."
        ],
        isMajorSurgery: true,
        hasStent: true,
        isBilateral: true
    },
    "DJS_REMOVAL_UNILATERAL": {
        name: "Unilateral Cystoscopic DJS Removal / Exchange",
        approachOptions: ["Removal", "Exchange"],
        category: "cat3",
        diagnosis: "Indwelling Ureteric DJ Stent (Unilateral)",
        benefits: "Safe cystoscopic extraction or exchange of the temporary internal stent.",
        alternatives: "Observation (not recommended due to risk of calcification/loss of kidney).",
        risks: [
            "Transient pain, spasms, hematuria, and dysuria.",
            "Urinary tract infection or urosepsis.",
            "Retraction of stent into the ureter requiring ureteroscopy for retrieval.",
            "Urethral irritation or injury."
        ],
        hasStent: true
    },
    "DJS_REMOVAL_BILATERAL": {
        name: "Bilateral Cystoscopic DJS Removal / Exchange",
        approachOptions: ["Removal", "Exchange"],
        category: "cat3",
        diagnosis: "Bilateral Indwelling Ureteric DJ Stents",
        benefits: "Cystoscopic removal or exchange of both stents under a single procedure.",
        alternatives: "Staged removal.",
        risks: [
            "Bilateral ureteral spasms causing transient flank pain.",
            "Sepsis or severe UTI.",
            "Retracted stents requiring bilateral ureteroscopy."
        ],
        hasStent: true,
        isBilateral: true
    },
    "ANASTOMOTIC_URETHROPLASTY": {
        name: "Anastomotic Urethroplasty",
        category: "cat4",
        diagnosis: "Short-segment Bulbar / Posterior Urethral Stricture",
        benefits: "Excision of the strictured urethral segment and primary end-to-end anastomosis for high cure rates.",
        alternatives: "Optical internal urethrotomy, urethral dilatation, or permanent suprapubic catheter.",
        risks: [
            "Recurrence of urethral stricture (requires further dilatation or OIU).",
            "Post-operative erectile dysfunction (temporary or permanent) due to cavernosal nerve injury.",
            "Penile shortening or chordee (curvature).",
            "Urinary incontinence (due to sphincter weakness) or semen pooling in bulbar urethra.",
            "Graft necrosis, graft loss, or urethral fistula (urethrocutaneous fistula) requiring multiple complex salvage surgeries; permanent erectile dysfunction or severe chordee (penile curvature); pelvic bone osteomyelitis."
        ],
        isMajorSurgery: true,
        hasCatheter: true
    },
    "SUBSTITUTION_URETHROPLASTY": {
        name: "Substitution Urethroplasty (Buccal Mucosa / Skin Graft)",
        approachOptions: ["Buccal Mucosa", "Skin Graft"],
        category: "cat4",
        diagnosis: "Long-segment Urethral Stricture / Panurethral stricture",
        benefits: "Reconstruction of the urethra using buccal mucosa graft or skin graft for long strictures.",
        alternatives: "Perineal urethrostomy, multi-stage Johanson's repair, or OIU.",
        risks: [
            "Graft failure, necrosis, or contracture leading to stricture recurrence.",
            "Donor site complications (mouth pain, difficulty opening mouth, numbness, salivary duct injury).",
            "Fistula formation (urethrocutaneous fistula) requiring secondary repair.",
            "Post-void dribbling or semen sequestration.",
            "Graft necrosis, graft loss, or urethral fistula (urethrocutaneous fistula) requiring multiple complex salvage surgeries; permanent erectile dysfunction or severe chordee (penile curvature); pelvic bone osteomyelitis."
        ],
        isMajorSurgery: true,
        hasCatheter: true
    },
    "JOHANSON_URETHROPLASTY": {
        name: "Stage I and Stage II Johanson's Urethroplasty",
        category: "cat4",
        diagnosis: "Complex / Lichen Sclerosus-associated Urethral Stricture",
        benefits: "Two-staged reconstruction of the urethra to manage complex or diseased urethral tissue.",
        alternatives: "Single-stage graft urethroplasty or perineal urethrostomy.",
        risks: [
            "Failure of the first stage (graft loss/tissue contraction) delaying the second stage.",
            "Stricture at the new meatus or at the anastomosis.",
            "Urethrocutaneous fistula after the second-stage closure.",
            "Spraying of urine between stages."
        ],
        isMajorSurgery: true,
        hasCatheter: true
    },
    "PYELOPLASTY": {
        name: "Open / Laparoscopic / Robotic Anderson-Hynes Pyeloplasty",
        approachOptions: ["Open", "Laparoscopic", "Robotic"],
        category: "cat4",
        diagnosis: "Ureteropelvic Junction Obstruction (UPJO)",
        benefits: "Surgical reconstruction of the UPJ to relieve obstruction, drain the kidney, and preserve renal function.",
        alternatives: "Endopyelotomy, balloon dilation, or nephrectomy (if non-functioning).",
        risks: [
            "Anastomotic leak or urinoma requiring prolonged stenting or drain placement.",
            "Recurrence of UPJ obstruction (due to scarring) requiring secondary pyeloplasty or endopyelotomy.",
            "Crossing vessel injury or bleeding requiring conversion to open surgery.",
            "Infection, retroperitoneal abscess, or loss of kidney function.",
            "Anastomotic breakdown with massive urine leak (urinoma) leading to retroperitoneal fibrosis or sepsis; loss of kidney function requiring nephrectomy; injury to major crossing renal vessels requiring emergency vascular reconstruction."
        ],
        isMajorSurgery: true,
        hasCatheter: true,
        hasStent: true,
        isLaparoscopicOrRobotic: true
    },
    "URETEROURETEROSTOMY": {
        name: "Ureteroureterostomy",
        category: "cat4",
        diagnosis: "Ureteric stricture / Segmental ureteric injury",
        benefits: "Excision of the strictured/injured ureteric segment and end-to-end reconstruction of the ureter.",
        alternatives: "Ureteral reimplantation, transureteroureterostomy (TUU), or nephrostomy tube.",
        risks: [
            "Ureteral anastomotic leak or urine extravasation.",
            "Recurrent stricture at the anastomosis.",
            "Devascularization of the ureter leading to necrosis and fistula."
        ],
        isMajorSurgery: true,
        hasStent: true
    },
    "TUU": {
        name: "Transureteroureterostomy (TUU)",
        category: "cat4",
        diagnosis: "Distal ureteric stricture / Large pelvic ureteric defect",
        benefits: "Bypassing a damaged distal ureter by tunneling it across the midline to anastomose with the contralateral healthy ureter.",
        alternatives: "Boari flap reimplantation, ileal ureter, or permanent nephrostomy.",
        risks: [
            "contralateral (healthy) ureteric injury or stricture (jeopardizing the normal kidney).",
            "Anastomotic leak or stricture at the cross-over site.",
            "Reflux of urine between kidneys."
        ],
        isMajorSurgery: true,
        hasStent: true
    },
    "URETERAL_REIMPLANT": {
        name: "Ureteral Reimplantation (Politano-Leadbetter / Lich-Gregoir)",
        category: "cat4",
        diagnosis: "Distal ureteric stricture / Vesicoureteral reflux (VUR)",
        benefits: "Re-routing and surgical reimplantation of the ureter into the bladder with an anti-reflux mechanism.",
        alternatives: "Endoscopic deflux injection, balloon dilation, or nephrostomy.",
        risks: [
            "Ureteral stenosis at the new ureterovesical junction (UVJ).",
            "Urine leak at the cystotomy site.",
            "Recurrent vesicoureteral reflux or persistent hydronephrosis."
        ],
        isMajorSurgery: true,
        hasCatheter: true,
        hasStent: true
    },
    "URETERAL_REIMPLANT_HITCH": {
        name: "Ureteral Reimplantation with Psoas Hitch / Boari Flap",
        category: "cat4",
        diagnosis: "Mid-to-distal ureteric loss / Complex ureteric stricture",
        benefits: "Bridging large ureteral defects by mobilizing the bladder and anchoring it to the psoas muscle (Psoas Hitch) or creating a bladder flap (Boari Flap).",
        alternatives: "Ileal ureter, TUU, or nephrectomy.",
        risks: [
            "injury to the femoral nerve (causing quadriceps weakness or leg numbness) due to psoas muscle sutures.",
            "Bladder flap necrosis or leakage from the bladder reconstructive lines.",
            "Bladder dysfunction (decreased capacity, urgency, or urinary retention).",
            "Anastomotic stricture."
        ],
        isMajorSurgery: true,
        hasCatheter: true,
        hasStent: true
    },
    "ILEAL_URETER": {
        name: "Ileal Ureter Substitution",
        category: "cat4",
        diagnosis: "Total / Near-total ureteric stricture or loss",
        benefits: "Replacing the diseased ureter with a detubularized segment of the small intestine (ileum).",
        alternatives: "Autotransplantation, permanent nephrostomy, or nephrectomy.",
        risks: [
            "Electrolyte abnormalities (hyperchloremic metabolic acidosis) due to intestinal absorption of urine.",
            "Mucus production from the ileal segment causing mucus plugs and urinary tract obstruction.",
            "Intestinal complications: anastomotic leak, bowel obstruction, or malabsorption.",
            "Chronic pyelonephritis or recurrent UTIs."
        ],
        isMajorSurgery: true,
        hasCatheter: true,
        hasStent: true
    },
    "AUGMENTATION_CYSTOPLASTY": {
        name: "Augmentation Cystoplasty (Ileocystoplasty)",
        category: "cat4",
        diagnosis: "Neurogenic bladder / Small capacity high-pressure bladder / Interstitial cystitis",
        benefits: "Surgically enlarging the bladder capacity using a segment of bowel to lower bladder pressure and protect the kidneys.",
        alternatives: "Indwelling catheter, suprapubic catheter, or urinary diversion.",
        risks: [
            "Metabolic acidosis, vitamin B12 deficiency.",
            "Bladder rupture (perforation of augmented patch) which is a life-threatening emergency.",
            "Need for permanent Clean Intermittent Catheterization (CISC) to empty the bladder.",
            "Bladder stone formation (due to mucus retention) and increased risk of malignancy in the bowel patch over decades."
        ],
        isMajorSurgery: true,
        hasCatheter: true
    },
    "MITROFANOFF": {
        name: "Mitrofanoff Appendicovesicostomy",
        category: "cat4",
        diagnosis: "Neurogenic bladder / Inability to catheterize via urethra",
        benefits: "Creating a continent catheterizable abdominal channel using the appendix to allow easy bladder emptying.",
        alternatives: "Mitrofanoff using a bowel segment (Monti), urethral catheter, or suprapubic tube.",
        risks: [
            "Stomal stenosis (narrowing of the abdominal opening) making catheterization impossible.",
            "Stomal leakage (incontinence from the channel).",
            "Appendix graft necrosis or stenosis of the vesico-appendiceal junction.",
            "Urinary tract infection or bladder calculus."
        ],
        isMajorSurgery: true,
        hasCatheter: true
    },
    "VVF": {
        name: "Vesicovaginal Fistula (VVF) Repair",
        gender: "Female",
        category: "cat4",
        diagnosis: "Vesicovaginal Fistula (abnormal tract between bladder and vagina)",
        benefits: "Surgical closure of the fistula to cure continuous urine leakage through the vagina.",
        alternatives: "Conservative management (prolonged catheterization), tissue glue, or urinary diversion.",
        risks: [
            "Failure of repair and recurrence of VVF (rate increases with previous failed attempts or radiation).",
            "Ureteral injury during dissection (may require reimplantation).",
            "Decreased bladder capacity, urgency, or bladder spasms.",
            "Vaginal shortening or dyspareunia (painful intercourse).",
            "Failure of repair and recurrence of fistula (especially in irradiated tissues or prior failed repairs); ureteral ligation or injury during dissection requiring ureteral reimplantation; permanent vaginal shortening or severe dyspareunia (painful intercourse)."
        ],
        isMajorSurgery: true,
        hasCatheter: true,
        isLaparoscopicOrRobotic: true
    },
    "URETEROVAGINAL_FISTULA": {
        name: "Ureterovaginal Fistula Repair",
        gender: "Female",
        category: "cat4",
        diagnosis: "Ureterovaginal Fistula (leakage from ureter into vagina)",
        benefits: "Repairing the ureteral leak (usually via ureteral reimplantation) to stop vaginal urine leak and protect the kidney.",
        alternatives: "Ureteral stenting (RIRS/RPG) or nephrostomy tube.",
        risks: [
            "Anastomotic leak or stricture at the reimplant site.",
            "Persistent vaginal leakage requiring re-exploration.",
            "Loss of kidney function due to chronic obstruction.",
            "Failure of repair and recurrence of fistula (especially in irradiated tissues or prior failed repairs); ureteral ligation or injury during dissection requiring ureteral reimplantation; permanent vaginal shortening or severe dyspareunia (painful intercourse)."
        ],
        isMajorSurgery: true,
        hasCatheter: true,
        hasStent: true
    },
    "SLING": {
        name: "Mid-Urethral Sling (TVT / TOT)",
        approachOptions: ["TVT", "TOT"],
        gender: "Female",
        category: "cat4",
        diagnosis: "Female Stress Urinary Incontinence (SUI)",
        benefits: "Placing a synthetic mesh sling under the urethra to support it and cure leakage during coughing, sneezing, or exercise.",
        alternatives: "Pelvic floor muscle training, urethral bulking agents, or Burch colposuspension.",
        risks: [
            "Mesh erosion into the urethra or vagina, requiring surgical excision of the mesh.",
            "De novo urinary urgency or urge incontinence (overactive bladder symptoms).",
            "Urinary retention or voiding difficulty requiring temporary or permanent self-catheterization.",
            "Pelvic pain, thigh pain (specific to TOT), or dyspareunia.",
            "Erosion of synthetic mesh/cuff into the urethra, bladder, or vagina, requiring complete surgical explantation; chronic intractable pelvic pain; severe infection requiring device removal, leading to severe scarring."
        ],
        isMajorSurgery: true,
        hasCatheter: true
    },
    "AUS": {
        name: "Artificial Urinary Sphincter (AUS) Implantation",
        category: "cat4",
        diagnosis: "Severe Post-Prostatectomy / Post-Traumatic Urinary Incontinence",
        benefits: "Implanting a fluid-filled cuff around the urethra to restore mechanical continence.",
        alternatives: "Male sling, penile clamp, long-term catheter, or pads.",
        risks: [
            "Urethral erosion by the cuff requiring device removal.",
            "Infection of the prosthetic components requiring complete removal of the device.",
            "Mechanical failure of the pump, reservoir, or cuff over time (average lifespan 7-10 years).",
            "Urethral atrophy under the cuff leading to recurrent incontinence.",
            "Erosion of synthetic mesh/cuff into the urethra, bladder, or vagina, requiring complete surgical explantation; chronic intractable pelvic pain; severe infection requiring device removal, leading to severe scarring."
        ],
        isMajorSurgery: true,
        hasCatheter: true
    },
    "SACRAL_NEUROMODULATION": {
        name: "Sacral Neuromodulation (InterStim) Placement",
        category: "cat4",
        diagnosis: "Refractory Overactive Bladder (OAB) / Non-obstructive urinary retention",
        benefits: "Implanting a lead to stimulate sacral nerves (S3) to restore normal bladder reflexes.",
        alternatives: "Botox injections, oral medications, or self-catheterization.",
        risks: [
            "Lead migration or malfunction requiring revision.",
            "Infection at the generator or lead site requiring device removal.",
            "Pain or uncomfortable stimulation at the lead site.",
            "Need for battery replacement (every 3-5 years for non-rechargeable)."
        ],
        isMajorSurgery: true
    },
    "BULKING_AGENTS": {
        name: "Injection of Periurethral Bulking Agents",
        category: "cat4",
        diagnosis: "Stress Urinary Incontinence (SUI) - Male or Female",
        benefits: "Cystoscopic injection of bulking material into the urethral wall to improve coaptation.",
        alternatives: "Sling surgery, AUS, or pelvic floor exercises.",
        risks: [
            "Urinary retention or dysuria.",
            "Migration or absorption of the bulking agent leading to treatment failure.",
            "Urethral mucosal sloughing or abscess at the injection site."
        ],
        hasCatheter: true
    },
    "DORSAL_SLIT": {
        name: "Dorsal Slit of Prepuce",
        gender: "Male",
        category: "cat5",
        diagnosis: "Severe Phimosis with balanitis / Paraphimosis",
        benefits: "Incising the dorsal foreskin to relieve constriction and allow exposure of the glans penis.",
        alternatives: "CIRCUMCISION (formal removal of foreskin).",
        risks: [
            "Bleeding or hematoma.",
            "Infection of the incision site.",
            "Unsightly cosmetic appearance of the slit foreskin requiring delayed circumcision."
        ]
    },
    "VASECTOMY": {
        name: "Bilateral No-Scalpel Vasectomy (NSV)",
        gender: "Male",
        category: "cat5",
        diagnosis: "Desire for permanent surgical contraception",
        benefits: "Highly effective, permanent sterilization via a minimally invasive puncture technique.",
        alternatives: "Barrier methods (condoms), female tubal ligation, or oral contraceptives.",
        risks: [
            "Failure rate of approximately 1 in 2000 due to recanalization.",
            "Hematoma or infection (orchitis/epididymitis).",
            "Sperm granuloma (painful lump at vasectomy site).",
            "Chronic post-vasectomy pain syndrome (chronic testicular pain).",
            "Not immediately effective: must use alternative contraception until a post-vasectomy semen analysis shows azoospermia (zero sperm) at 3 months."
        ]
    },
    "VASOVASOSTOMY": {
        name: "Microsurgical Vasovasostomy (Vasectomy Reversal)",
        gender: "Male",
        category: "cat5",
        diagnosis: "Post-vasectomy infertility / Desire to restore fertility",
        benefits: "Reconnecting the severed ends of the vas deferens using microsurgery to restore sperm in semen.",
        alternatives: "Sperm retrieval (TESE/PESA) combined with IVF/ICSI, or adoption.",
        risks: [
            "Failure to restore sperm (patency rate 80-90%, pregnancy rate 50-60% depending on years since vasectomy).",
            "Scrotal hematoma or wound infection.",
            "Late occlusion (re-narrowing) of the connection due to scar tissue."
        ],
        isMajorSurgery: true
    },
    "VASOEPIDIDYMOSTOMY": {
        name: "Microsurgical Vasoepididymostomy",
        gender: "Male",
        category: "cat5",
        diagnosis: "Epididymal obstruction / Failed vasovasostomy",
        benefits: "Anastomosing the vas deferens directly to an epididymal tubule to bypass blockages.",
        alternatives: "IVF/ICSI with sperm retrieval.",
        risks: [
            "Lower success rate than vasovasostomy (patency 50-70%, pregnancy 30-40%).",
            "Epididymal injury or chronic testicular pain.",
            "Hematoma or scrotal infection."
        ],
        isMajorSurgery: true
    },
    "MICROSURGICAL_VARICOCELECTOMY": {
        name: "Microsurgical Varicocelectomy",
        gender: "Male",
        category: "cat5",
        diagnosis: "Clinical Varicocele with male subfertility or chronic testicular pain",
        benefits: "Ligating dilated testicular veins under microscope to improve semen parameters and relieve pain.",
        alternatives: "Open/laparoscopic varicocelectomy, radiological embolization, or observation.",
        risks: [
            "Hydrocele formation (due to lymphatic ligation) requiring subsequent surgery (reduced to <1% with microscope).",
            "Testicular artery injury leading to testicular atrophy (shrinkage and loss of function).",
            "Recurrence or persistence of varicocele.",
            "Infection, hematoma, or persistent pain.",
            "Accidental ligation of the testicular artery leading to testicular atrophy (shrinkage and loss of hormone/sperm production); chronic scrotal pain; conversion to open surgery."
        ],
        isMajorSurgery: true
    },
    "LAP_VARICOCELECTOMY": {
        name: "Laparoscopic / Open Varicocelectomy",
        approachOptions: ["Laparoscopic", "Open"],
        gender: "Male",
        category: "cat5",
        diagnosis: "Varicocele with subfertility or scrotal pain",
        benefits: "Ligating internal spermatic veins via abdominal laparoscopic or open approach.",
        alternatives: "Microsurgical varicocelectomy or embolization.",
        risks: [
            "Higher risk of hydrocele formation (compared to microsurgery).",
            "Conversion to open surgery (for laparoscopic route).",
            "Injury to abdominal bowel or vessels (laparoscopic route).",
            "Testicular artery injury or varicocele recurrence.",
            "Accidental ligation of the testicular artery leading to testicular atrophy (shrinkage and loss of hormone/sperm production); chronic scrotal pain; conversion to open surgery."
        ],
        isMajorSurgery: true,
        isLaparoscopicOrRobotic: true
    },
    "TESE": {
        name: "Testicular Sperm Extraction (TESE / Micro-TESE)",
        approachOptions: ["TESE", "Micro-TESE"],
        gender: "Male",
        category: "cat5",
        diagnosis: "Azoospermia (Non-obstructive or Obstructive)",
        benefits: "Retrieving sperm directly from testicular tissue for use in ICSI/IVF.",
        alternatives: "Donor insemination or adoption.",
        risks: [
            "Failure to retrieve viable sperm (especially in non-obstructive cases).",
            "Testicular hematoma or parenchymal scarring causing loss of Leydig cells (hypogonadism).",
            "Testicular infection or chronic pain."
        ]
    },
    "MESA": {
        name: "Microsurgical Epididymal Sperm Aspiration (MESA)",
        gender: "Male",
        category: "cat5",
        diagnosis: "Obstructive Azoospermia",
        benefits: "Microsurgical retrieval of large quantities of high-quality sperm from the epididymis.",
        alternatives: "PESA, TESE, or donor sperm.",
        risks: [
            "Failure to retrieve sperm.",
            "Scrotal hematoma or epididymal injury.",
            "Infection or chronic pain."
        ]
    },
    "PESA": {
        name: "Percutaneous Epididymal Sperm Aspiration (PESA)",
        gender: "Male",
        category: "cat5",
        diagnosis: "Obstructive Azoospermia",
        benefits: "Needle aspiration of sperm from the epididymis under local anesthesia.",
        alternatives: "MESA, TESE, or adoption.",
        risks: [
            "Failure to obtain sperm.",
            "Scrotal pain, swelling, or hematoma."
        ]
    },
    "TESTICULAR_BIOPSY": {
        name: "Testicular Biopsy",
        gender: "Male",
        category: "cat5",
        diagnosis: "Azoospermia / Suspected intratubular germ cell neoplasia",
        benefits: "Diagnostic histology of testicular tissue to evaluate spermatogenesis.",
        alternatives: "Empirical treatment or genetic testing.",
        risks: [
            "Bleeding or scrotal hematoma.",
            "Testicular atrophy (rare).",
            "Wound infection."
        ]
    },
    "SEMIRIGID_PROSTHESIS": {
        name: "Malleable (Semi-Rigid) Penile Prosthesis Implantation",
        gender: "Male",
        category: "cat5",
        diagnosis: "Severe, refractory Erectile Dysfunction (ED)",
        benefits: "Surgical implantation of bendable rods in the corpora cavernosa to allow reliable mechanical erections.",
        alternatives: "Inflatable prosthesis, oral PDE5 inhibitors, intracavernosal injections, or vacuum devices.",
        risks: [
            "Prosthetic infection requiring complete removal of the device (a devastating complication).",
            "Erosion of the rods through the urethra, glans, or skin.",
            "Mechanical failure, sizing issues, or chronic penile pain.",
            "Destruction of remaining natural erectile tissue, making future non-prosthetic erections impossible.",
            "Prosthetic infection requiring immediate device explantation (salvage failure); erosion of the cylinders through the glans penis, scrotum, or urethra; destruction of residual erectile tissue making non-prosthetic erections permanently impossible."
        ],
        isMajorSurgery: true,
        hasCatheter: true
    },
    "INFLATABLE_PROSTHESIS": {
        name: "Three-Piece Inflatable Penile Prosthesis (IPP) Implantation",
        gender: "Male",
        category: "cat5",
        diagnosis: "Refractory Erectile Dysfunction",
        benefits: "Implantation of fluid-filled cylinders, pump, and reservoir to provide highly natural-appearing erections.",
        alternatives: "Malleable prosthesis, injections, or vacuum device.",
        risks: [
            "Infection requiring immediate salvage surgery or device explantation.",
            "Mechanical failure of the pump, cylinders, or tubing requiring surgical revision.",
            "Urethral or bladder injury during reservoir placement.",
            "Auto-inflation, cylinder migration, or penile shortening.",
            "Prosthetic infection requiring immediate device explantation (salvage failure); erosion of the cylinders through the glans penis, scrotum, or urethra; destruction of residual erectile tissue making non-prosthetic erections permanently impossible."
        ],
        isMajorSurgery: true,
        hasCatheter: true
    },
    "PEYRONIES_CORRECTION": {
        name: "Surgical Correction of Peyronie's Disease (Plication / Grafting)",
        approachOptions: ["Plication", "Grafting"],
        gender: "Male",
        category: "cat5",
        diagnosis: "Peyronie's Disease (penile curvature causing painful or impossible intercourse)",
        benefits: "Surgical straightening of the penis by plicating the convex side or grafting the concave side.",
        alternatives: "Xiaflex injections, traction devices, or penile prosthesis.",
        risks: [
            "Penile shortening (especially with plication techniques).",
            "De novo erectile dysfunction (up to 20-30% with grafting techniques).",
            "Penile numbness or altered sensation.",
            "Palpable knots (sutures) under the skin, or recurrent curvature."
        ],
        isMajorSurgery: true
    },
    "HYDROCELE_EXCISION": {
        name: "Excision of Hydrocele (Lord's / Jaboulay's Repair)",
        approachOptions: ["Lord's", "Jaboulay's"],
        gender: "Male",
        category: "cat5",
        diagnosis: "Hydrocele (fluid accumulation around the testis)",
        benefits: "Excision or plication of the tunica vaginalis sac to permanently cure scrotal swelling.",
        alternatives: "Aspiration and sclerotherapy (high recurrence rate), or observation.",
        risks: [
            "Large scrotal hematoma (scrotum can swell to size of a grapefruit).",
            "Wound infection or scrotal abscess.",
            "Recurrence of hydrocele (rare).",
            "Testicular injury or atrophy.",
            "Massive scrotal hematoma (filling the scrotum to the size of a grapefruit) requiring surgical drainage; chronic testicular pain; testicular ischemia leading to atrophy."
        ]
    },
    "SPERMATOCELECTOMY": {
        name: "Spermatocelectomy / Epididymectomy",
        approachOptions: ["Spermatocelectomy", "Epididymectomy"],
        gender: "Male",
        category: "cat5",
        diagnosis: "Spermatocele / Epididymal cyst / Chronic epididymitis",
        benefits: "Removal of the epididymal cyst or the entire epididymis to relieve swelling or chronic infection.",
        alternatives: "Aspiration or observation.",
        risks: [
            "Injury to the testicular artery leading to testicular necrosis or atrophy.",
            "Infertility on the operated side (due to severance of sperm transit path).",
            "Scrotal hematoma or chronic pain."
        ]
    },
    "ORCHIDOPEXY": {
        name: "Orchidopexy (for Undescended Testis / Testicular Torsion)",
        gender: "Male",
        category: "cat5",
        diagnosis: "Cryptorchidism (undescended testis) / Testicular Torsion",
        benefits: "Surgical mobilization and anchoring of the testis in the scrotum to preserve fertility and prevent torsion.",
        alternatives: "Orchiectomy (if testis is dead/atrophic) or hormone therapy.",
        risks: [
            "Testicular atrophy (loss of blood supply during mobilization).",
            "Retraction of the testis back into the groin requiring repeat surgery.",
            "Vas deferens injury leading to infertility on that side.",
            "Scrotal hematoma or infection."
        ]
    },
    "RADICAL_PROSTATECTOMY": {
        name: "Radical Prostatectomy (Open / Laparoscopic / Robotic-Assisted)",
        approachOptions: ["Open", "Laparoscopic", "Robotic-Assisted"],
        gender: "Male",
        category: "cat6",
        diagnosis: "Localized Prostate Cancer",
        benefits: "Surgical removal of the prostate, seminal vesicles, and surrounding tissue to cure prostate cancer.",
        alternatives: "Radiation therapy, active surveillance, androgen deprivation therapy.",
        risks: [
            "Urinary incontinence: temporary leakage is common; permanent incontinence requiring pads or AUS occurs in 5-10%.",
            "Erectile dysfunction: high incidence (50-90%) even with nerve-sparing techniques.",
            "Anastamotic stricture (bladder neck contracture).",
            "Rectal injury during dissection leading to fecal fistula or requiring temporary colostomy.",
            "Permanent urinary incontinence (5-10%) requiring lifelong pads or artificial urinary sphincter (AUS); permanent erectile dysfunction (50-90%); rectal injury during dissection leading to fecal fistula or requiring temporary colostomy."
        ],
        isMajorSurgery: true,
        hasCatheter: true,
        isLaparoscopicOrRobotic: true
    },
    "PLND": {
        name: "Pelvic Lymph Node Dissection (PLND)",
        category: "cat6",
        diagnosis: "High-risk Prostate / Bladder Cancer",
        benefits: "Staging and therapeutic removal of pelvic lymph nodes to assess and control cancer spread.",
        alternatives: "No dissection (relying on imaging alone).",
        risks: [
            "Lymphocele (fluid collection in the pelvis) requiring drainage.",
            "Deep vein thrombosis (DVT) or pulmonary embolism due to proximity to iliac vessels.",
            "Obturator nerve injury causing weakness in thigh adduction.",
            "Lymphedema (swelling) of the lower limbs or scrotum."
        ],
        isMajorSurgery: true
    },
    "RADICAL_NEPHRECTOMY": {
        name: "Radical Nephrectomy (Open / Laparoscopic / Robotic)",
        approachOptions: ["Open", "Laparoscopic", "Robotic"],
        category: "cat6",
        diagnosis: "Renal Cell Carcinoma (Renal Mass) / Non-functioning kidney",
        benefits: "Removal of the entire kidney, surrounding fat, and adrenal gland (optional) to cure kidney cancer.",
        alternatives: "Partial nephrectomy, active surveillance, radiofrequency ablation.",
        risks: [
            "Severe hemorrhage from renal hilar vessels requiring major transfusion or re-exploration.",
            "Adjacent organ injury: spleen, liver, pancreas, bowel, or major vessels (IVC/aorta).",
            "Loss of overall renal function leading to renal failure, especially if the remaining kidney is diseased.",
            "Incisional hernia or flank bulge.",
            "Catastrophic bleeding from renal hilum or major vessels (IVC/aorta) requiring emergency splenectomy, liver resection, or vascular grafting; delayed secondary hemorrhage (pseudoaneurysm) requiring emergency angioembolization; urine leak from collecting system requiring prolonged stenting or re-operation; acute renal failure in single-kidney patients."
        ],
        isMajorSurgery: true,
        isLaparoscopicOrRobotic: true
    },
    "PARTIAL_NEPHRECTOMY": {
        name: "Partial Nephrectomy / Nephron-Sparing Surgery",
        approachOptions: ["Partial Nephrectomy", "Nephron-Sparing Surgery"],
        category: "cat6",
        diagnosis: "Small Renal Mass (kidney cancer)",
        benefits: "Removal of the tumor while preserving the rest of the kidney to maintain long-term renal function.",
        alternatives: "Radical nephrectomy, ablation, or surveillance.",
        risks: [
            "Post-operative urine leak from the renal collecting system (requires DJ stenting or nephrostomy).",
            "Delayed secondary hemorrhage (pseudoaneurysm) requiring emergency angioembolization.",
            "Warm ischemia time damage leading to temporary or permanent loss of function in the operated kidney.",
            "Positive surgical margins requiring close monitoring or radical nephrectomy.",
            "Catastrophic bleeding from renal hilum or major vessels (IVC/aorta) requiring emergency splenectomy, liver resection, or vascular grafting; delayed secondary hemorrhage (pseudoaneurysm) requiring emergency angioembolization; urine leak from collecting system requiring prolonged stenting or re-operation; acute renal failure in single-kidney patients."
        ],
        isMajorSurgery: true,
        hasStent: true,
        isLaparoscopicOrRobotic: true
    },
    "RADICAL_NEPHROURETERECTOMY": {
        name: "Radical Nephroureterectomy with Bladder Cuff Excision",
        category: "cat6",
        diagnosis: "Upper Tract Urothelial Carcinoma (UTUC)",
        benefits: "Complete removal of the kidney, entire ureter, and a cuff of the bladder to cure transitional cell cancer.",
        alternatives: "Segmental ureterectomy, endoscopic laser ablation, or chemotherapy.",
        risks: [
            "Bladder leak at the site of bladder cuff excision.",
            "Intake of chemotherapy (e.g. Mitomycin C) into the bladder post-op causing chemical cystitis.",
            "Iliac vessel injury during distal ureter dissection.",
            "General major surgical and single-kidney risks."
        ],
        isMajorSurgery: true,
        hasCatheter: true,
        isLaparoscopicOrRobotic: true
    },
    "RADICAL_CYSTECTOMY": {
        name: "Radical Cystectomy (Open / Laparoscopic / Robotic)",
        approachOptions: ["Open", "Laparoscopic", "Robotic"],
        category: "cat6",
        diagnosis: "Muscle-Invasive Bladder Cancer",
        benefits: "Removal of the entire bladder, prostate (in men), uterus/ovaries (in women) to cure aggressive bladder cancer.",
        alternatives: "Trimodality therapy (TURBT + chemo-radiation) or systemic chemotherapy alone.",
        risks: [
            "Extremely high complication rate (>50%).",
            "Severe blood loss requiring multiple transfusions.",
            "Urinary diversion complications (ileal conduit leak, stomal stenosis, neobladder incontinence).",
            "Bowel dysfunction, ileus, small bowel obstruction, or anastomotic leak.",
            "Severe pelvic infection or wound dehiscence.",
            "Urinary/bowel anastomotic leak leading to fecal or chemical peritonitis, requiring emergency re-laparotomy and stoma creation; small bowel obstruction or ileus; pelvic abscess and wound dehiscence; permanent neobladder incontinence or physical hypercontinence requiring lifelong self-catheterization; high rate of deep vein thrombosis (DVT) and fatal pulmonary embolism; on-table mortality."
        ],
        isMajorSurgery: true,
        hasCatheter: true,
        isLaparoscopicOrRobotic: true
    },
    "ILEAL_CONDUIT": {
        name: "Ileal Conduit Urinary Diversion (Bricker)",
        category: "cat6",
        diagnosis: "Surgical removal of bladder / Neurogenic bladder",
        benefits: "Creating a urinary conduit using a short piece of small bowel to drain urine to an external abdominal stoma bag.",
        alternatives: "Orthotopic neobladder, cutaneous ureterostomy, or catheter.",
        risks: [
            "Ureteroileal anastomotic leak (urine leak in abdomen) or stricture (kidney obstruction).",
            "Stoma complications: retraction, necrosis, parastomal hernia, or skin irritation.",
            "Bowel anastomosis leak or obstruction.",
            "Metabolic abnormalities and chronic UTIs.",
            "Urinary/bowel anastomotic leak leading to fecal or chemical peritonitis, requiring emergency re-laparotomy and stoma creation; small bowel obstruction or ileus; pelvic abscess and wound dehiscence; permanent neobladder incontinence or physical hypercontinence requiring lifelong self-catheterization; high rate of deep vein thrombosis (DVT) and fatal pulmonary embolism; on-table mortality."
        ],
        isMajorSurgery: true,
        hasCatheter: true,
        hasStent: true
    },
    "NEOBLADDER": {
        name: "Orthotopic Neobladder Creation (Studer / Hautmann)",
        category: "cat6",
        diagnosis: "Surgical bladder removal",
        benefits: "Reconstructing a new bladder using bowel, connected to the urethra to allow voiding without an external bag.",
        alternatives: "Ileal conduit or continent pouch.",
        risks: [
            "Neobladder incontinence (especially nocturnal incontinence in up to 30-50%).",
            "Hyper-continence (inability to void) requiring lifelong self-catheterization (especially in females).",
            "Metabolic acidosis, mucus plugging of the urethra.",
            "Rupture of the neobladder requiring emergency surgery.",
            "Urinary/bowel anastomotic leak leading to fecal or chemical peritonitis, requiring emergency re-laparotomy and stoma creation; small bowel obstruction or ileus; pelvic abscess and wound dehiscence; permanent neobladder incontinence or physical hypercontinence requiring lifelong self-catheterization; high rate of deep vein thrombosis (DVT) and fatal pulmonary embolism; on-table mortality."
        ],
        isMajorSurgery: true,
        hasCatheter: true
    },
    "RPLND": {
        name: "Retroperitoneal Lymph Node Dissection (RPLND)",
        category: "cat6",
        diagnosis: "Testicular Cancer (residual mass / high-risk staging)",
        benefits: "Surgical excision of lymph nodes surrounding the aorta and vena cava to cure metastatic testicular cancer.",
        alternatives: "Chemotherapy or close surveillance.",
        risks: [
            "Loss of ejaculation (retrograde ejaculation) due to sympathetic nerve injury (reduced with nerve-sparing).",
            "Chylous ascites (lymphatic leak into abdomen) requiring special diet or drainage.",
            "Major vascular injury (aorta/IVC) causing catastrophic bleeding.",
            "Bowel injury or post-operative bowel obstruction."
        ],
        isMajorSurgery: true,
        isLaparoscopicOrRobotic: true
    },
    "RADICAL_INGUINAL_ORCHIECTOMY": {
        name: "Radical Inguinal Orchiectomy",
        category: "cat6",
        diagnosis: "Testicular Mass / Suspected Testicular Cancer",
        benefits: "Removal of the testis and spermatic cord through the groin to diagnose and cure testicular cancer.",
        alternatives: "Observation or biopsy (strongly contraindicated due to tumor seeding).",
        risks: [
            "Scrotal/inguinal hematoma or bleeding.",
            "Inguinal nerve injury causing permanent numbness in the groin/inner thigh.",
            "Infertility or psychological distress (prosthesis options discussed).",
            "Incisional pain or hernia."
        ],
        isMajorSurgery: true
    },
    "PENECTOMY": {
        name: "Partial Penectomy / Total Penectomy with Perineal Urethrostomy",
        approachOptions: ["Partial Penectomy", "Total Penectomy with Perineal Urethrostomy"],
        gender: "Male",
        category: "cat6",
        diagnosis: "Penile Cancer",
        benefits: "Surgical removal of the diseased portion of the penis to clear penile cancer.",
        alternatives: "Radiotherapy, laser therapy (early stages), or chemotherapy.",
        risks: [
            "Loss of sexual function and penile length.",
            "Perineal urethrostomy stricture (narrowing of the new perineal urinary opening) leading to spray or obstruction.",
            "Need for sitting to void urine.",
            "Severe psychological distress.",
            "Bleeding or flap necrosis."
        ],
        isMajorSurgery: true,
        hasCatheter: true
    },
    "RADICAL_LYMPHADENECTOMY": {
        name: "Radical Ilioinguinal Lymphadenectomy",
        category: "cat6",
        diagnosis: "Metastatic Penile / Urethral Cancer",
        benefits: "Excision of deep and superficial groin lymph nodes to control cancer spread.",
        alternatives: "Radiotherapy or palliative chemotherapy.",
        risks: [
            "Extremely high rate of wound breakdown, skin flap necrosis, and delayed healing.",
            "Severe lymphedema (permanent chronic swelling) of both legs and scrotum.",
            "Lymph leak or lymphocele.",
            "Femoral artery rupture (catastrophic) if wound infection exposes the major vessels (sartorius flap transposition performed to protect).",
            "Wound breakdown, skin flap necrosis, and delayed healing (occurs in up to 50% of cases); catastrophic femoral artery blow-out (fatal hemorrhage) due to infection exposing the major vessels; permanent, disabling leg and scrotal lymphedema."
        ],
        isMajorSurgery: true
    },
    "ADRENALECTOMY": {
        name: "Adrenalectomy (Open / Laparoscopic / Robotic)",
        approachOptions: ["Open", "Laparoscopic", "Robotic"],
        category: "cat6",
        diagnosis: "Adrenal Mass / Pheochromocytoma / Cushing's disease",
        benefits: "Surgical removal of the adrenal gland to treat tumors or hormonal hypersecretion.",
        alternatives: "Medical suppression therapy or observation.",
        risks: [
            "Hemorphage from adrenal veins or vena cava.",
            "Adrenal crisis (acute drop in steroid hormones) causing life-threatening shock requiring steroid replacement.",
            "Hypertensive crisis or arrhythmias during tumor handling (especially pheochromocytoma).",
            "Pneumothorax or diaphragmatic injury."
        ],
        isMajorSurgery: true,
        isLaparoscopicOrRobotic: true
    },
    "RETROPERITONEAL_MASS": {
        name: "Excision of Retroperitoneal Masses",
        category: "cat6",
        diagnosis: "Retroperitoneal Sarcoma / Retroperitoneal tumor",
        benefits: "Surgical removal of retroperitoneal tumors to relieve pressure and treat cancer.",
        alternatives: "Radiotherapy or chemotherapy.",
        risks: [
            "Inability to completely resect mass due to vascular invasion.",
            "Need to resect adjacent organs (kidney, spleen, bowel, pancreas).",
            "Massive blood loss and injury to major lumbar vessels.",
            "High tumor recurrence rate."
        ],
        isMajorSurgery: true
    },
    "LAP_DONOR_NEPHRECTOMY": {
        name: "Laparoscopic Living Donor Nephrectomy",
        category: "cat7",
        diagnosis: "Healthy Renal Donor",
        benefits: "Removal of one healthy kidney from a living donor using laparoscopy for transplantation into recipient.",
        alternatives: "Open donor nephrectomy, or deceased donor transplant.",
        risks: [
            "Major bleeding from renal artery/vein requiring urgent open conversion.",
            "Pneumothorax, bowel injury, or adrenal injury.",
            "Decreased renal reserve in donor (approx. 50% loss of function, remaining kidney hypertrophies).",
            "Donor mortality (extremely rare, approx 0.03%)."
        ],
        isMajorSurgery: true,
        isLaparoscopicOrRobotic: true
    },
    "ROBOTIC_DONOR_NEPHRECTOMY": {
        name: "Robotic Living Donor Nephrectomy",
        category: "cat7",
        diagnosis: "Healthy Renal Donor",
        benefits: "Robotic-assisted removal of one healthy kidney to optimize donor recovery.",
        alternatives: "Laparoscopic or open donor nephrectomy.",
        risks: [
            "Robotic system failure requiring conversion to open/laparoscopic.",
            "Vascular injury to renal hilar vessels.",
            "Standard laparoscopic donor risks."
        ],
        isMajorSurgery: true,
        isLaparoscopicOrRobotic: true
    },
    "DECEASED_DONOR_RETRIEVAL": {
        name: "Open Deceased Donor (Cadaveric) Multi-Organ Retrieval",
        category: "cat7",
        diagnosis: "Brain-dead organ donor",
        benefits: "Retrieval of viable kidneys and other organs for transplant into waitlisted patients.",
        alternatives: "None.",
        risks: [
            "Warm ischemia damage leading to graft non-function.",
            "Accidental vascular or parenchymal injury to the kidneys during rapid harvest.",
            "Transmission of donor infections or occult malignancies to recipients (screened)."
        ],
        isMajorSurgery: true
    },
    "RECIPIENT_TRANSPLANT": {
        name: "Recipient Renal Transplantation (Heterotopic Kidney Transplant)",
        category: "cat7",
        diagnosis: "End-Stage Renal Disease (ESRD) on Dialysis",
        benefits: "Implanting a functioning donor kidney into the iliac fossa to restore normal renal function and free patient from dialysis.",
        alternatives: "Lifelong hemodialysis, peritoneal dialysis, or no treatment.",
        risks: [
            "Hyperacute, acute, or chronic graft rejection leading to graft loss.",
            "Vascular complications: renal artery thrombosis or renal vein thrombosis (resulting in immediate transplant failure/nephrectomy), or arterial stenosis.",
            "Ureteral complications: urine leak or ureteral stricture requiring stenting, nephrostomy, or surgical revision.",
            "Lymphocele around the graft causing pressure on iliac veins or ureter.",
            "Immunosuppressive side effects: opportunistic infections (CMV, fungal), drug toxicity (tacrolimus nephrotoxicity), and increased risk of cancer.",
            "Renal artery or vein thrombosis leading to immediate transplant failure and emergency graft nephrectomy; hyperacute or acute rejection leading to graft loss; anastomotic leak or ureteral necrosis requiring re-operation; lymphocele compressing major vessels; life-threatening opportunistic infections (CMV, fungal) or post-transplant malignancy (PTLD) due to lifelong immunosuppression."
        ],
        isMajorSurgery: true,
        hasCatheter: true,
        hasStent: true
    },
    "ROBOTIC_RECIPIENT_TRANSPLANT": {
        name: "Transperitoneal Robotic Recipient Renal Transplantation",
        category: "cat7",
        diagnosis: "End-Stage Renal Disease (ESRD)",
        benefits: "Robotic-assisted placement of donor kidney to reduce wound complications and optimize vascular anastomosis.",
        alternatives: "Standard open heterotopic kidney transplantation.",
        risks: [
            "Intra-abdominal bowel or vessel injury due to transperitoneal approach.",
            "Graft failure or thrombotic loss.",
            "Ureteral leaks or lymphoceles.",
            "Robotic malfunction.",
            "Renal artery or vein thrombosis leading to immediate transplant failure and emergency graft nephrectomy; hyperacute or acute rejection leading to graft loss; anastomotic leak or ureteral necrosis requiring re-operation; lymphocele compressing major vessels; life-threatening opportunistic infections (CMV, fungal) or post-transplant malignancy (PTLD) due to lifelong immunosuppression."
        ],
        isMajorSurgery: true,
        hasCatheter: true,
        hasStent: true,
        isLaparoscopicOrRobotic: true
    },
    "GRAFT_NEPHRECTOMY": {
        name: "Kidney Transplant Graft Nephrectomy",
        category: "cat7",
        diagnosis: "Failed / Rejected / Infected Renal Transplant Graft",
        benefits: "Removal of the failed kidney transplant graft to treat severe pain, fever, infection, hematuria, or malignant change.",
        alternatives: "Conservative management (high risk of chronic infection/hemorrhage) or angioembolization.",
        risks: [
            "Severe hemorrhage due to dense adhesions around the iliac vessels (requires subcapsular dissection, high bleeding risk).",
            "Iliac artery/vein tear requiring vascular reconstruction.",
            "Injury to surrounding bowel (cecum/sigmoid colon) or ureter.",
            "Sepsis or pelvic abscess.",
            "Catastrophic hemorrhage due to dense adhesions around the iliac vessels (requires subcapsular dissection with high risk of tearing the iliac artery or vein); injury to the bowel (cecum/sigmoid colon) or pelvic nerves; pelvic sepsis."
        ],
        isMajorSurgery: true
    },
    "PERINEAL_URETHROSTOMY": {
        name: "Perineal Urethrostomy",
        gender: "Male",
        category: "cat4",
        diagnosis: "Severe complex urethral stricture / Lichen sclerosus (BXO) / Anterior urethral loss / Failed anterior urethroplasty",
        benefits: "Creation of a permanent urinary opening in the perineum (between scrotum and anus) to bypass the diseased anterior urethra, relieve voiding obstruction, and protect kidney function.",
        alternatives: "Long-term/permanent suprapubic catheter, repeated painful urethral dilations, complex multi-stage buccal mucosa graft urethroplasty, or conservative monitoring.",
        risks: [
            "Perineal urethrostomy stricture (narrowing of the new opening) requiring regular self-dilation or surgical revision.",
            "Permanent loss of the ability to void standing up, requiring the patient to sit down to urinate for the rest of their life.",
            "Post-void dribbling, urinary spraying, and skin irritation or fungal dermatitis in the perineum from urine contact.",
            "Scrotal/perineal hematoma or wound breakdown due to high moisture and bacterial load in the perineal region.",
            "Worsening of erectile dysfunction or penile numbness due to surgical dissection near the cavernosal nerves.",
            "Urinary tract infection (UTI) or chronic bacterial prostatitis."
        ],
        isMajorSurgery: true,
        hasCatheter: true
    },
    "DJS_PREGNANCY": {
        name: "Double-J (DJ) Stent Placement during Pregnancy",
        gender: "Female",
        category: "cat3",
        diagnosis: "Ureteric obstruction due to pregnancy / Hydronephrosis of pregnancy / Intractable flank pain or urosepsis in pregnancy",
        benefits: "Relief of maternal kidney obstruction, drainage of infected urine, and relief of severe flank pain with minimal/no fluoroscopy to protect the fetus.",
        alternatives: "Percutaneous Nephrostomy (PCN) tube placement under ultrasound guidance, conservative analgesia (with risk of progressive sepsis/preterm labor), or early induction of labor (if near term).",
        risks: [
            "Extremely high risk of rapid stent calcification/encrustation due to pregnancy-associated hypercalciuria, requiring frequent exchanges (every 4-6 weeks) until delivery.",
            "Severe stent-related symptoms including intense bladder spasms, pelvic pain, burning urination, frequency, urgency, and blood in urine (exacerbated by fetal head pressure).",
            "Preterm labor, uterine contractions, or fetal distress induced by surgical stress, positioning, or anesthesia.",
            "Systemic infection or maternal urosepsis, which poses a direct, life-threatening risk to both mother and fetus.",
            "Anesthetic risks to the fetus including miscarriage, premature delivery, or developmental toxicity.",
            "Spontaneous stent displacement, downward migration, or extrusion due to pregnancy-induced anatomical changes and ureteral dilatation.",
            "Minimal radiation exposure to the fetus if limited fluoroscopy is absolutely necessary (ultrasound guidance will be prioritized)."
        ],
        isMajorSurgery: true,
        hasCatheter: true,
        hasStent: true
    },
    "THERAPEUTIC_CYSTOSCOPY_PROCEED": {
        name: "Therapeutic Cystoscopy and Proceed",
        category: "cat2",
        diagnosis: "Hematuria / Lower Urinary Tract Symptoms (LUTS) / Bladder mass / Urethral stricture under evaluation",
        benefits: "Direct endoscopic diagnostic mapping of the lower urinary tract with single-session therapeutic clearance or correction of encountered pathologies, avoiding repeated anesthesia.",
        alternatives: "Diagnostic-only cystoscopy followed by delayed discussion and a separate scheduled therapeutic operation; non-invasive imaging alone (CT, MRI) which lacks biopsy capability.",
        risks: [
            "Mild to moderate hematuria (blood in urine) and painful urination (dysuria) for 24-72 hours post-procedure.",
            "Urinary tract infection (UTI) or severe urosepsis requiring intravenous antibiotics and prolonged hospital stay.",
            "Injury to the urethra or bladder neck, false passage creation, or bladder wall perforation requiring open surgical conversion and repair.",
            "Acute urinary retention requiring temporary or prolonged catheterization.",
            "If prostate or bladder neck tissue is resected/incised (e.g. TURP, BNI): retrograde ejaculation (dry orgasm) in >75% of patients, affecting future fertility.",
            "If stricture division or urethral dilation is performed: high rate of stricture recurrence requiring regular self-dilations.",
            "Temporary or permanent urinary incontinence due to sphincter stretching or injury.",
            "Need to place an indwelling urethral catheter or a Double-J (DJ) stent with associated irritative symptoms.",
            "Incomplete stone clearance or incomplete tumor resection necessitating secondary staged procedures."
        ],
        isMajorSurgery: true,
        hasCatheter: true,
        hasStent: true
    },
    "HOLEP": {
        name: "Holmium Laser Enucleation of the Prostate (HoLEP)",
        gender: "Male",
        category: "cat2",
        diagnosis: "Benign Prostatic Hyperplasia (BPH) with severe bladder outflow obstruction",
        benefits: "Complete endoscopic laser enucleation of the obstructing prostatic adenoma, resulting in dramatic relief of lower urinary tract symptoms, high flow rates, low recurrence rates, and compatibility with large gland sizes.",
        alternatives: "Transurethral Resection of the Prostate (TURP), open/simple prostatectomy, medical therapy, or long-term catheterization.",
        risks: [
            "Transient urinary incontinence (stress or urge-based) which is common initially and typically resolves within weeks to months.",
            "Retrograde ejaculation (dry orgasm) in >75% of cases, impacting future fertility.",
            "Prostatic capsule perforation with absorption of irrigation fluid, potentially requiring conversion to TURP or open surgery.",
            "Ureteric orifice injury or postoperative ureteric stricture if resection is close to the orifices.",
            "Transient or persistent dysuria (burning during urination), urgency, and mild hematuria.",
            "Delayed hematuria (secondary bleeding) from tissue sloughing, requiring catheter insertion, irrigation, or re-operation.",
            "Urethral stricture or bladder neck contracture in the long term.",
            "Sepsis or urinary tract infection."
        ],
        isMajorSurgery: true,
        hasCatheter: true
    },
    "TORSION_EXPLORATION": {
        name: "Surgical Exploration of Acute Scrotum for Testicular Torsion",
        gender: "Male",
        category: "cat5",
        diagnosis: "Acute scrotum / Suspected testicular torsion",
        benefits: "Immediate surgical exploration to assess testicular viability, untwist (detort) the affected testis to restore blood flow, perform orchidopexy (anchoring) to prevent recurrence, and perform prophylactic contralateral orchidopexy.",
        alternatives: "Manual detorsion (unreliable, temporary), observation (leads to testicular death, infection, and immunological destruction of the other testis).",
        risks: [
            "Necessity of unilateral orchiectomy (complete surgical removal of the testis) if the testis is found to be completely necrotic (dead) or non-viable.",
            "Testicular atrophy (shrinkage and progressive loss of function/fertility) of the salvaged testis due to prolonged ischemia prior to surgery.",
            "Immunological injury to the contralateral healthy testis due to exposure to testicular antigens from a necrotic testis, potentially impairing long-term fertility.",
            "Scrotal hematoma, severe postoperative swelling, or wound infection.",
            "Persistent scrotal pain or paresthesia from nerve irritation.",
            "Recurrence of torsion if the anchoring sutures fail or pull through."
        ],
        isMajorSurgery: true
    },
    "ROBOTIC_SACROCOLPOPEXY": {
        name: "Robotic / Laparoscopic Sacrocolpopexy",
        approachOptions: ["Robotic", "Laparoscopic"],
        gender: "Female",
        category: "cat4",
        diagnosis: "Pelvic organ prolapse / Vaginal vault prolapse / Symptomatic cystorectocele",
        benefits: "Durable suspension and anatomical correction of vaginal vault prolapse using a synthetic mesh anchored to the sacral promontory to restore pelvic support.",
        alternatives: "Vaginal sacrospinous fixation, colpocleisis (vaginal obliteration), pelvic floor physical therapy, or supportive pessary placement.",
        risks: [
            "Mesh erosion or extrusion into the vagina, bladder, or bowel (occurring in 2-5% of cases), which can cause chronic discharge, bleeding, or pain and requires complex surgical removal of mesh.",
            "Bowel injury (perforation of rectum or small bowel) or postoperative bowel obstruction (ileus/adhesions) requiring conversion or re-operation.",
            "Bladder or ureteral injury during dissection requiring immediate reconstruction, stenting, or catheterization.",
            "Sacral osteomyelitis or discitis (infection of the sacral bone/disc) which is a rare but severe complication requiring prolonged IV antibiotics.",
            "De novo urinary urgency, urge incontinence, or worsening of stress incontinence.",
            "Dyspareunia (painful intercourse) or persistent pelvic pain.",
            "Deep vein thrombosis (DVT) or pulmonary embolism."
        ],
        isMajorSurgery: true,
        hasCatheter: true,
        isLaparoscopicOrRobotic: true
    },
    "BMG_HARVEST": {
        name: "Buccal Mucosa Graft (BMG) Harvest (Donor Site)",
        category: "cat4",
        diagnosis: "Urethral stricture disease requiring graft substitution / Ureteral stricture requiring graft reconstruction",
        benefits: "Harvesting high-quality, hairless, wet mucosa from the inner cheek or lower lip to be used for reconstructive urethroplasty or ureteroplasty.",
        alternatives: "Use of genital skin flaps, split-thickness skin grafts, or synthetic tissue (which have lower success and higher stricture recurrence rates).",
        risks: [
            "Persistent mouth pain, swelling, and severe difficulty opening the mouth (trismus) for several weeks.",
            "Permanent numbness or altered sensation of the inner cheek, lower lip, or chin due to injury to distal branches of the mental/buccal nerves.",
            "Damage to the parotid duct (Stensen's duct) opening inside the cheek, potentially leading to salivary gland swelling, sialadenitis, or duct stenosis.",
            "Oral bleeding, hematoma, or infection of the donor site suture line.",
            "Changes in speech, difficulty swallowing, or alteration in taste initially.",
            "Graft retraction or scarring of the inner cheek, which may cause a pulling sensation during mouth movement."
        ],
        isMajorSurgery: true
    },
    "PCN_PLACEMENT": {
        name: "Percutaneous Nephrostomy (PCN) Placement",
        category: "cat1",
        diagnosis: "Ureteric obstruction / Hydronephrosis / Urosepsis / Pyonephrosis / Urinary leak",
        benefits: "Immediate urinary decompression of an obstructed, infected, or leaking kidney directly through the skin of the back under ultrasound/fluoroscopic guidance, preserving renal function and resolving sepsis.",
        alternatives: "Retrograde ureteral stenting (DJS placement), open surgical drainage, or conservative management.",
        risks: [
            "Severe hemorrhage from renal parenchymal puncture requiring blood transfusion, emergency angioembolization, or nephrectomy.",
            "Accidental puncture or perforation of adjacent organs, including the pleural cavity (causing pneumothorax or hemothorax requiring a chest tube) or bowel (colon).",
            "Sepsis, bacteremia, or septic shock due to entry into an infected, pressurized collection of urine.",
            "Urinoma (urine leak into the retroperitoneum) or retroperitoneal hematoma.",
            "Catheter displacement, kinking, or blockage requiring urgent re-intervention or tube replacement.",
            "Severe chronic pain or localized infection around the tube exit site on the back."
        ],
        hasNephrostomy: true
    },
    "SCROTAL_TRAUMA_EXPLORATION": {
        name: "Surgical Exploration of Scrotum for Trauma",
        gender: "Male",
        category: "cat5",
        diagnosis: "Scrotal trauma / Testicular rupture / Scrotal hematoma or hematocele",
        benefits: "Immediate surgical evaluation of the scrotum and its contents, repair of ruptured testicular tunica albuginea, debridement of necrotic tissue, evacuation of tense hematoma to relieve pressure and prevent infection, and preservation of testicular tissue/hormone function.",
        alternatives: "Conservative management (high risk of testicular necrosis, abscess, chronic pain, and loss of endocrine/exocrine function).",
        risks: [
            "Necessity of unilateral or bilateral orchiectomy (complete removal of the testis/testes) if the testicular tissue is found to be completely shattered, devitalized, or non-viable.",
            "Postoperative testicular atrophy (testicular shrinkage) due to microvascular disruption from the trauma or surgical repair.",
            "Severe wound infection, scrotal necrosis (Fournier's gangrene risk), or scrotal abscess.",
            "Development of anti-sperm antibodies due to disruption of the blood-testis barrier, compromising long-term fertility.",
            "Chronic scrotal pain, sensory loss, or scrotal hematoma re-accumulation.",
            "Dehiscence (opening) of the scrotal skin incisions due to tissue swelling and high moisture."
        ],
        isMajorSurgery: true
    },
    "OPEN_URETEROLITHOTOMY": {
        name: "Open / Laparoscopic Ureterolithotomy",
        approachOptions: ["Open", "Laparoscopic"],
        category: "cat3",
        diagnosis: "Large / Impacted / Obstructing Ureteric Calculus",
        benefits: "Direct surgical access to the ureter (via open incision or laparoscopy) to extract a large or impacted stone that cannot be managed endoscopically.",
        alternatives: "Retrograde Intrarenal Surgery (RIRS), Ureteroscopic Lithotripsy (URSL), Extracorporeal Shockwave Lithotripsy (ESWL), or percutaneous antegrade ureterolithotripsy.",
        risks: [
            "Ureteral leakage or urinoma (urine collecting in retroperitoneum) requiring prolonged drain or double-J stent retention.",
            "Delayed ureteral stricture (scarring and narrowing of the ureter) due to surgical incision or stone impaction, requiring reconstruction later.",
            "Adjacent organ or vascular injury during dissection (renal vessels, iliac vessels, bowel).",
            "Conversion from laparoscopic to open surgery in the event of dense adhesions or bleeding.",
            "Hernia or flank muscle weakness at the incision site."
        ],
        isMajorSurgery: true,
        hasCatheter: true,
        hasStent: true,
        isLaparoscopicOrRobotic: true
    },
    "ESWL": {
        name: "Extracorporeal Shock Wave Lithotripsy (ESWL)",
        category: "cat3",
        diagnosis: "Renal calculus / Ureteric calculus",
        benefits: "Non-invasive fragmentation of kidney or ureteric stone(s) using external shockwaves under ultrasound or X-ray localization, allowing stone fragments to pass naturally in urine.",
        alternatives: "Retrograde Intrarenal Surgery (RIRS), Ureteroscopic Lithotripsy (URSL), Percutaneous Nephrolithotomy (PCNL), or conservative management.",
        risks: [
            "Severe renal hematoma (blood accumulation around or inside the kidney) which may require blood transfusion, hospitalization, or rarely surgical intervention or nephrectomy (loss of kidney).",
            "Steinstrasse (stone street) - accumulation of fragmented stone dust or pieces blocking the ureter, causing severe obstruction, pain, or infection, and requiring urgent stent insertion or ureteroscopy.",
            "Severe urosepsis (blood infection) due to release of bacteria from the fragmented stone, which can lead to life-threatening septic shock.",
            "Cardiac arrhythmia (irregular heartbeat) triggered by shockwave pulses, necessitating session termination or pacemaker synchronization.",
            "Severe skin bruising, blistering, or muscular pain in the flank or back area at the shockwave entry site.",
            "Incomplete stone fragmentation necessitating repeated ESWL sessions or alternative endoscopic surgeries.",
            "Haematuria (blood in urine) which is common and usually resolves within 24-72 hours."
        ],
        isMajorSurgery: false,
        hasStent: false,
        hasCatheter: false
    },
    "SIMPLE_NEPHRECTOMY": {
        name: "Simple Nephrectomy (Open / Laparoscopic / Robotic)",
        approachOptions: ["Open", "Laparoscopic", "Robotic"],
        category: "cat6",
        diagnosis: "Non-functioning kidney / Chronic pyelonephritis / Xanthogranulomatous pyelonephritis (XGP) / Severe hydronephrosis / Renovascular hypertension",
        benefits: "Removal of the diseased, non-functioning, or chronically infected kidney to relieve chronic pain, prevent life-threatening recurrent sepsis, control severe hypertension, or prevent spread of infection.",
        alternatives: "Long-term suppressive antibiotic therapy, permanent nephrostomy drainage, or conservative monitoring.",
        risks: [
            "Catastrophic hemorrhage from the renal hilum, major vessels (inferior vena cava, aorta), or lumbar vessels, requiring emergency conversion to open surgery, major blood transfusions, or emergency vascular repair.",
            "Severe perinephric adhesions (especially in chronic infection or XGP) making dissection extremely difficult, increasing risk of adjacent organ injury (bowel, spleen, liver, pancreas, diaphragm).",
            "Pleural injury (pneumothorax or hemothorax) due to close proximity to the ribs and diaphragm, requiring emergency chest tube insertion.",
            "Acute kidney injury (AKI) or renal failure in the remaining kidney, which may necessitate temporary or permanent dialysis.",
            "Incisional hernia, chronic flank bulge, or permanent numbness or pain along the incision site due to intercostal nerve injury.",
            "Deep vein thrombosis (DVT) or life-threatening pulmonary embolism."
        ],
        isMajorSurgery: true,
        hasCatheter: true,
        isLaparoscopicOrRobotic: true
    },
    "SIMPLE_ORCHIECTOMY": {
        name: "Simple Orchiectomy (Unilateral / Bilateral)",
        approachOptions: ["Unilateral", "Bilateral"],
        gender: "Male",
        category: "cat5",
        diagnosis: "Advanced prostate cancer (androgen deprivation therapy) / Testicular infection or abscess / Testicular necrosis / Testicular trauma",
        benefits: "Removal of one or both testicles to eliminate infected or dead tissue, control advanced prostate cancer by reducing testosterone, or manage severe testicular trauma.",
        alternatives: "For prostate cancer: medical castration (LHRH agonists/antagonists); for infection/trauma: prolonged high-dose antibiotics, scrotal drainage, or conservative management with high risk of sepsis.",
        risks: [
            "Bilateral procedure causes permanent infertility and loss of natural testosterone production, leading to hot flashes, loss of libido, erectile dysfunction, osteoporosis, and fatigue.",
            "Severe scrotal hematoma (filling the scrotum with blood) requiring surgical evacuation or drainage.",
            "Scrotal wound infection or wound breakdown, which can lead to Fournier's gangrene (life-threatening scrotal gangrene) requiring extensive debridement.",
            "Chronic phantom testicular pain or scrotal hypersensitivity.",
            "Psychological impact due to altered body image (testicular prostheses can be discussed as a future option)."
        ],
        isMajorSurgery: true,
        hasCatheter: false
    },
    "FRENULOPLASTY": {
        name: "Frenuloplasty of Penis",
        gender: "Male",
        category: "cat5",
        diagnosis: "Frenulum breve / Frenular tear or bleeding during intercourse / Dyspareunia",
        benefits: "Surgical release and plastic reconstruction of a short penile frenulum to relieve pain during erection or intercourse, prevent tearing/bleeding, and improve penile comfort.",
        alternatives: "Steroid creams and stretching exercises, circumcision, or conservative avoidance of sexual activity.",
        risks: [
            "Bleeding or hematoma formation, as the frenular artery is highly vascular; may require secondary suturing.",
            "Scar tissue contracture or recurrence of tightness, which may necessitate a secondary circumcision.",
            "Altered or reduced sensitivity of the glans penis or frenular area.",
            "Severe pain or tearing of sutures during nocturnal erections, requiring careful management.",
            "Wound infection or delayed healing requiring avoidance of sexual activity for 4-6 weeks."
        ],
        isMajorSurgery: false,
        hasCatheter: false
    }
};

/**
 * Compiles a detailed, medicolegally watertight consent text.
 */
function compileConsentText(procKey, customDiag = "", customProc = "", customRisks = "", side = "N/A", isHighRisk = false, hasStentManual = false) {
    const procedure = URO_PROCEDURES[procKey];
    
    let diagnosis = customDiag;
    let procedurePlanned = customProc;
    let benefits = "";
    let alternatives = "";
    let specificRisks = [];
    let isMajor = false;
    let hasStent = !!hasStentManual; // Set explicitly by the manual toggle!
    let hasCatheter = false;
    let hasNephrostomy = false;
    let isBilateral = false;
    let isLaparoscopic = false;

    if (procKey !== "OTHER" && procedure) {
        diagnosis = customDiag || procedure.diagnosis;
        if (procKey === "MALE_CYSTOSCOPY_PROCEED_COMBINED" || procKey === "FEMALE_CYSTOSCOPY_PROCEED_COMBINED" || procKey === "THERAPEUTIC_CYSTOSCOPY_PROCEED") {
            procedurePlanned = customProc || "Cystoscopy and Proceed";
        } else {
            procedurePlanned = customProc || procedure.name;
        }
        benefits = procedure.benefits;
        alternatives = procedure.alternatives;
        specificRisks = [...procedure.risks];
        isMajor = !!procedure.isMajorSurgery;
        // hasStent is set manually via parameter
        hasCatheter = !!procedure.hasCatheter;
        hasNephrostomy = !!procedure.hasNephrostomy;
        isBilateral = !!procedure.isBilateral || side === "Bilateral";
        isLaparoscopic = !!procedure.isLaparoscopicOrRobotic;
    } else {
        // OTHER / CUSTOM
        diagnosis = customDiag || "Urological pathology under evaluation";
        procedurePlanned = customProc || "Custom Urology Surgical Intervention";
        benefits = "Treatment of primary pathology, relief of symptoms, and preservation of renal/urinary tract function.";
        alternatives = "Conservative medical management, alternative surgical interventions, or observation as explained by the team.";
        if (customRisks) {
            specificRisks = customRisks.split(",").map(r => r.trim()).filter(Boolean);
        } else {
            specificRisks = ["Specific risks explained verbally by the operating team."];
        }
        isMajor = true; // Safe default for custom
        hasCatheter = true;
    }

    const sidePrefix = (side && side !== "N/A") ? (side + " ") : "";
    if (sidePrefix && !diagnosis.startsWith(sidePrefix)) {
        diagnosis = sidePrefix + diagnosis;
    }
    if (sidePrefix && !procedurePlanned.startsWith(sidePrefix)) {
        procedurePlanned = sidePrefix + procedurePlanned;
    }

    let text = `DIAGNOSIS: ${diagnosis}\n`;
    text += `PROCEDURE PLANNED: ${procedurePlanned}\n`;
    text += `BENEFITS EXPECTED:\n${benefits}\n`;
    text += `ALTERNATIVES DISCUSSED & REFUSED:\n${alternatives}\n`;
    
    text += `SPECIFIC RISKS & COMPLICATIONS (Read and Explained):\n`;
    text += `I understand that all surgeries carry risks. Specific to this procedure, I have been informed of the following risks (which I accept): `;
    
    const formattedRisks = specificRisks.map((risk, index) => `(${index + 1}) ${risk}`).join("; ");
    text += formattedRisks + ".\n";
    if (isMajor) {
        text += `GENERAL MAJOR SURGICAL RISKS: `;
        const majorRisks = [
            "Bleeding & Hemorrhage: Risk of bleeding during or after surgery, which may require blood transfusion, clot evacuation, or surgical re-exploration",
            "Severe Infection & Sepsis: Risk of wound infection, deep pelvic infection, urinary tract infection, or systemic urosepsis which can progress to life-threatening septic shock",
            "Thromboembolism: Risk of deep vein thrombosis (DVT) in the legs or pulmonary embolism (blood clot in the lungs), which can be fatal",
            "Anesthesia Risks: Risks associated with general, spinal, or epidural anesthesia including allergic reaction, respiratory failure, cardiac arrest, or death",
            "Adjacent Organ Injury: Risk of accidental damage to surrounding structures (bowel, bladder, ureter, nerves, major blood vessels) requiring immediate repair during the surgery"
        ];
        text += majorRisks.map((risk, index) => `(${index + 1}) ${risk}`).join("; ") + ".\n";
    }
    text += `EXPLICIT CONSENT FOR INTRAOPERATIVE CONTINGENCIES:\n`;
    text += `I authorize the surgical team to alter the procedure ONLY IF a life-threatening emergency arises, or if stopping the surgery to obtain fresh consent would cause me medical harm. Specifically, I consent to:\n`;
    if (hasStent) {
        text += `- Abandoning the primary endoscopic procedure and deploying a DJ stent for "passive dilation" if the ureter is too tight to safely admit the instrument, acknowledging a staged procedure will be needed later.\n`;
    }
    if (isLaparoscopic) {
        text += `- Immediate conversion to an open surgical approach in the event of intractable bleeding, dense adhesions, or severe organ injury.\n`;
    }
    if (hasNephrostomy) {
        text += `- Placement of a Percutaneous Nephrostomy (PCN) tube directly into my kidney if standard retrograde drainage fails.\n`;
    }
    const isUroOncOrReconstructive = procedure && (procedure.category === "cat4" || procedure.category === "cat6" || procedure.category === "cat7");
    if (isMajor && (isUroOncOrReconstructive || procKey === "OTHER")) {
        text += `- Perform any necessary bowel resection, stoma creation, or vessel grafting if required as an emergency measure.\n`;
    }
    if (hasStent) {
        text += `CRITICAL DECLARATION REGARDING DOUBLE-J (DJ) STENT:\n`;
        text += `1. I have been explicitly informed that a Double-J (DJ) Ureteral Stent will be placed inside my body. I understand that this stent is a TEMPORARY foreign body and DOES NOT DISSOLVE.\n`;
        text += `2. I have been informed that the stent MUST be removed or exchanged within the timeframe specified by my surgeon (typically 4 to 12 weeks, and absolutely NOT exceeding 6 months for standard stents).\n`;
        text += `3. I understand that FAILURE TO RETURN for stent removal will lead to severe, irreversible medical complications, including but not limited to: severe stent encrustation (stone formation over the tube), complete loss of kidney function (renal failure necessitating lifelong dialysis or kidney removal), life-threatening urosepsis (severe blood infection), and the necessity of highly complex open or endoscopic surgeries to extract the calcified stent.\n`;
        text += `4. I have been warned of the common, expected stent symptoms (such as mild blood in the urine, bladder spasms, pain in the back/flank during urination, and urinary frequency/urgency) and when to seek emergency care (high fever, severe chills, inability to pass urine, or passing large blood clots).\n`;
        text += `5. By signing, I accept absolute personal responsibility for scheduling and attending my follow-up appointment for stent removal or exchange. I explicitly acknowledge that the hospital and the surgical team are not responsible for tracking my stent, and I release them from any and all clinical and medicolegal liability, including organ loss, permanent disability, or mortality, arising from my failure to report for timely stent removal.\n`;
    }
    if (hasCatheter) {
        text += `CRITICAL DECLARATION REGARDING URETHRAL CATHETER / SUPRAPUBIC CYSTOSTOMY:\n`;
        text += `I understand that a urethral catheter or suprapubic tube will be placed to drain my bladder. I have been informed that it requires strict hygiene, timely monitoring, and removal/exchange per the doctor's instructions. Failure to do so may lead to severe bladder spasm, urethral erosion, strictures, or chronic kidney damage.\n`;
    }
    if (hasNephrostomy) {
        text += `CRITICAL DECLARATION REGARDING NEPHROSTOMY TUBE:\n`;
        text += `I understand that an external nephrostomy tube will be draining my kidney directly. I agree to maintain tube hygiene, avoid pulling or displacement, and report immediately for block, leak, or fever. I accept responsibility for scheduled removal or exchange of the tube.\n`;
    }
    if (isHighRisk) {
        text += `SPECIAL HIGH-RISK CONSENT ADDENDUM:\n`;
        text += `I explicitly understand that due to the patient's advanced age, severe pre-existing medical conditions (comorbidities such as heart disease, lung disease, kidney impairment, liver dysfunction, diabetes, or blood clotting disorders), or the complex/emergency nature of this procedure, the surgical and anesthetic risks are SIGNIFICANTLY HEIGHTENED.\n`;
        text += `Specifically, I have been informed of and accept the high probability of the following outcomes:\n`;
        text += `- The necessity of post-operative admission to the Intensive Care Unit (ICU) or High Dependency Unit (HDU) for close monitoring.\n`;
        text += `- The potential need for prolonged mechanical ventilation (respiratory support/breathing machine) and delayed extubation.\n`;
        text += `- The requirement for intravenous inotropic or vasopressor support (medications to maintain blood pressure and heart function) due to hemodynamic instability.\n`;
        text += `- A significantly prolonged hospital stay, with a higher risk of hospital-acquired infections, deep vein thrombosis, and physical deconditioning.\n`;
        text += `- A heightened risk of major cardiovascular and cerebrovascular events, including heart attack (myocardial infarction), cardiac arrest, stroke, and multi-organ failure.\n`;
        text += `- Acute kidney injury (AKI) which may require emergency temporary or permanent hemodialysis.\n`;
        text += `- An increased risk of massive intraoperative hemorrhage requiring multiple blood transfusions or emergency surgical re-exploration.\n`;
        text += `- A recognized, elevated risk of mortality, including on-table death during the procedure or death in the early post-operative period.\n`;
        text += `Having fully understood these catastrophic risks, I consent to proceed with the proposed surgery under these high-risk conditions, and I accept the clinical decisions made by the surgical and anesthesia teams in managing these contingencies.\n`;
    }

    return text;
}

/**
 * Compiles a combined, medicolegally watertight consent text for one OR more concurrent procedures.
 *
 * @param {Array} proceduresList  - Array of procedure config objects:
 *   { procKey, side, customProc, customRisks, approachStr }
 *   approachStr is the formatted "Open / Laparoscopic" string selected from variant checkboxes.
 * @param {string} customDiag     - Shared diagnosis text entered by the user.
 * @param {boolean} isHighRisk    - High-risk patient toggle.
 * @param {boolean} hasStentManual - Manual override for the DJ stent toggle.
 */
function compileMultipleConsentText(proceduresList, customDiag = "", isHighRisk = false, hasStentManual = false) {
    if (!proceduresList || proceduresList.length === 0) return "";

    // --- Aggregate procedure details across all selected procedures ---
    let allProcedureNames   = [];
    let allBenefitParts     = [];
    let allAltParts         = [];
    let allSpecificRisks    = [];

    // Merged flags – set to true if ANY procedure requires them
    let isMajor          = false;
    let hasStent         = !!hasStentManual;
    let hasCatheter      = false;
    let hasNephrostomy   = false;
    let isLaparoscopic   = false;
    let hasUroOncOrRecon = false;

    proceduresList.forEach(({ procKey, side, customProc, customRisks, approachStr }) => {
        const proc = URO_PROCEDURES[procKey];
        const sidePrefix = (side && side !== "N/A") ? (side + " ") : "";

        if (procKey === "OTHER" || !proc) {
            // Custom / OTHER entry
            const cName = customProc || "Custom Urology Surgical Intervention";
            allProcedureNames.push(sidePrefix + cName);
            allBenefitParts.push("Treatment of primary pathology, relief of symptoms, and preservation of renal/urinary tract function.");
            allAltParts.push("Conservative medical management, alternative surgical interventions, or observation as explained by the team.");
            if (customRisks) {
                customRisks.split(",").map(r => r.trim()).filter(Boolean).forEach(r => allSpecificRisks.push(r));
            } else {
                allSpecificRisks.push("Specific risks explained verbally by the operating team.");
            }
            isMajor = true;
            hasCatheter = true;
        } else {
            // Build the display name, injecting selected approach variant
            let name = proc.name;
            if (approachStr && proc.approachOptions && proc.approachOptions.length > 0) {
                const fullStr = proc.approachOptions.join(" / ");
                const parenStr = "(" + fullStr + ")";
                if (name.includes(parenStr))      name = name.replace(parenStr, "(" + approachStr + ")");
                else if (name.includes(fullStr))  name = name.replace(fullStr, approachStr);
            }
            // Special display for "cystoscopy and proceed" variants
            if (procKey === "MALE_CYSTOSCOPY_PROCEED_COMBINED" ||
                procKey === "FEMALE_CYSTOSCOPY_PROCEED_COMBINED" ||
                procKey === "THERAPEUTIC_CYSTOSCOPY_PROCEED") {
                name = "Cystoscopy and Proceed";
            }

            let procName = sidePrefix + name;
            if (customProc) procName = sidePrefix + customProc;
            allProcedureNames.push(procName);

            if (proc.benefits)     allBenefitParts.push(proc.benefits);
            if (proc.alternatives) allAltParts.push(proc.alternatives);
            if (proc.risks)        proc.risks.forEach(r => allSpecificRisks.push(r));

            if (proc.isMajorSurgery)         isMajor        = true;
            if (proc.hasStent)               hasStent       = true;
            if (proc.hasCatheter)            hasCatheter    = true;
            if (proc.hasNephrostomy)         hasNephrostomy = true;
            if (proc.isLaparoscopicOrRobotic) isLaparoscopic = true;
            if (proc.category === "cat4" || proc.category === "cat6" || proc.category === "cat7") {
                hasUroOncOrRecon = true;
            }
        }
    });

    // Manual stent toggle always wins
    if (hasStentManual) hasStent = true;

    // --- Combine diagnosis ---
    let diagnosis = customDiag || "Urological pathology under evaluation";

    // --- Build combined procedure planned string ---
    let procedurePlanned = "";
    if (allProcedureNames.length === 1) {
        procedurePlanned = allProcedureNames[0];
    } else if (allProcedureNames.length === 2) {
        procedurePlanned = allProcedureNames[0] + " AND " + allProcedureNames[1];
    } else {
        const last = allProcedureNames.pop();
        procedurePlanned = allProcedureNames.join(", ") + ", AND " + last;
    }

    // --- Deduplicate benefits and alternatives ---
    function deduplicateLines(parts) {
        const seen = new Set();
        return parts.filter(p => {
            const key = p.trim().toLowerCase();
            if (!key || seen.has(key)) return false;
            seen.add(key);
            return true;
        }).join("\n");
    }

    const benefits     = deduplicateLines(allBenefitParts);
    const alternatives = deduplicateLines(allAltParts);

    // --- Deduplicate specific risks (case-insensitive) ---
    const seenRisks = new Set();
    const specificRisks = allSpecificRisks.filter(r => {
        const key = r.trim().toLowerCase();
        if (!key || seenRisks.has(key)) return false;
        seenRisks.add(key);
        return true;
    });

    // --- Assemble consent text (same structure as single-procedure) ---
    let text = `DIAGNOSIS: ${diagnosis}\n`;
    text += `PROCEDURE PLANNED: ${procedurePlanned}\n`;
    text += `BENEFITS EXPECTED:\n${benefits}\n`;
    text += `ALTERNATIVES DISCUSSED & REFUSED:\n${alternatives}\n`;

    text += `SPECIFIC RISKS & COMPLICATIONS (Read and Explained):\n`;
    text += `I understand that all surgeries carry risks. Specific to this procedure, I have been informed of the following risks (which I accept): `;
    const formattedRisks = specificRisks.map((risk, index) => `(${index + 1}) ${risk}`).join("; ");
    text += formattedRisks + ".\n";

    if (isMajor) {
        text += `GENERAL MAJOR SURGICAL RISKS: `;
        const majorRisks = [
            "Bleeding & Hemorrhage: Risk of bleeding during or after surgery, which may require blood transfusion, clot evacuation, or surgical re-exploration",
            "Severe Infection & Sepsis: Risk of wound infection, deep pelvic infection, urinary tract infection, or systemic urosepsis which can progress to life-threatening septic shock",
            "Thromboembolism: Risk of deep vein thrombosis (DVT) in the legs or pulmonary embolism (blood clot in the lungs), which can be fatal",
            "Anesthesia Risks: Risks associated with general, spinal, or epidural anesthesia including allergic reaction, respiratory failure, cardiac arrest, or death",
            "Adjacent Organ Injury: Risk of accidental damage to surrounding structures (bowel, bladder, ureter, nerves, major blood vessels) requiring immediate repair during the surgery"
        ];
        text += majorRisks.map((risk, index) => `(${index + 1}) ${risk}`).join("; ") + ".\n";
    }

    text += `EXPLICIT CONSENT FOR INTRAOPERATIVE CONTINGENCIES:\n`;
    text += `I authorize the surgical team to alter the procedure ONLY IF a life-threatening emergency arises, or if stopping the surgery to obtain fresh consent would cause me medical harm. Specifically, I consent to:\n`;
    if (hasStent) {
        text += `- Abandoning the primary endoscopic procedure and deploying a DJ stent for "passive dilation" if the ureter is too tight to safely admit the instrument, acknowledging a staged procedure will be needed later.\n`;
    }
    if (isLaparoscopic) {
        text += `- Immediate conversion to an open surgical approach in the event of intractable bleeding, dense adhesions, or severe organ injury.\n`;
    }
    if (hasNephrostomy) {
        text += `- Placement of a Percutaneous Nephrostomy (PCN) tube directly into my kidney if standard retrograde drainage fails.\n`;
    }
    if (isMajor && (hasUroOncOrRecon || proceduresList.some(p => p.procKey === "OTHER"))) {
        text += `- Perform any necessary bowel resection, stoma creation, or vessel grafting if required as an emergency measure.\n`;
    }

    if (hasStent) {
        text += `CRITICAL DECLARATION REGARDING DOUBLE-J (DJ) STENT:\n`;
        text += `1. I have been explicitly informed that a Double-J (DJ) Ureteral Stent will be placed inside my body. I understand that this stent is a TEMPORARY foreign body and DOES NOT DISSOLVE.\n`;
        text += `2. I have been informed that the stent MUST be removed or exchanged within the timeframe specified by my surgeon (typically 4 to 12 weeks, and absolutely NOT exceeding 6 months for standard stents).\n`;
        text += `3. I understand that FAILURE TO RETURN for stent removal will lead to severe, irreversible medical complications, including but not limited to: severe stent encrustation (stone formation over the tube), complete loss of kidney function (renal failure necessitating lifelong dialysis or kidney removal), life-threatening urosepsis (severe blood infection), and the necessity of highly complex open or endoscopic surgeries to extract the calcified stent.\n`;
        text += `4. I have been warned of the common, expected stent symptoms (such as mild blood in the urine, bladder spasms, pain in the back/flank during urination, and urinary frequency/urgency) and when to seek emergency care (high fever, severe chills, inability to pass urine, or passing large blood clots).\n`;
        text += `5. By signing, I accept absolute personal responsibility for scheduling and attending my follow-up appointment for stent removal or exchange. I explicitly acknowledge that the hospital and the surgical team are not responsible for tracking my stent, and I release them from any and all clinical and medicolegal liability, including organ loss, permanent disability, or mortality, arising from my failure to report for timely stent removal.\n`;
    }
    if (hasCatheter) {
        text += `CRITICAL DECLARATION REGARDING URETHRAL CATHETER / SUPRAPUBIC CYSTOSTOMY:\n`;
        text += `I understand that a urethral catheter or suprapubic tube will be placed to drain my bladder. I have been informed that it requires strict hygiene, timely monitoring, and removal/exchange per the doctor's instructions. Failure to do so may lead to severe bladder spasm, urethral erosion, strictures, or chronic kidney damage.\n`;
    }
    if (hasNephrostomy) {
        text += `CRITICAL DECLARATION REGARDING NEPHROSTOMY TUBE:\n`;
        text += `I understand that an external nephrostomy tube will be draining my kidney directly. I agree to maintain tube hygiene, avoid pulling or displacement, and report immediately for block, leak, or fever. I accept responsibility for scheduled removal or exchange of the tube.\n`;
    }
    if (isHighRisk) {
        text += `SPECIAL HIGH-RISK CONSENT ADDENDUM:\n`;
        text += `I explicitly understand that due to the patient's advanced age, severe pre-existing medical conditions (comorbidities such as heart disease, lung disease, kidney impairment, liver dysfunction, diabetes, or blood clotting disorders), or the complex/emergency nature of this procedure, the surgical and anesthetic risks are SIGNIFICANTLY HEIGHTENED.\n`;
        text += `Specifically, I have been informed of and accept the high probability of the following outcomes:\n`;
        text += `- The necessity of post-operative admission to the Intensive Care Unit (ICU) or High Dependency Unit (HDU) for close monitoring.\n`;
        text += `- The potential need for prolonged mechanical ventilation (respiratory support/breathing machine) and delayed extubation.\n`;
        text += `- The requirement for intravenous inotropic or vasopressor support (medications to maintain blood pressure and heart function) due to hemodynamic instability.\n`;
        text += `- A significantly prolonged hospital stay, with a higher risk of hospital-acquired infections, deep vein thrombosis, and physical deconditioning.\n`;
        text += `- A heightened risk of major cardiovascular and cerebrovascular events, including heart attack (myocardial infarction), cardiac arrest, stroke, and multi-organ failure.\n`;
        text += `- Acute kidney injury (AKI) which may require emergency temporary or permanent hemodialysis.\n`;
        text += `- An increased risk of massive intraoperative hemorrhage requiring multiple blood transfusions or emergency surgical re-exploration.\n`;
        text += `- A recognized, elevated risk of mortality, including on-table death during the procedure or death in the early post-operative period.\n`;
        text += `Having fully understood these catastrophic risks, I consent to proceed with the proposed surgery under these high-risk conditions, and I accept the clinical decisions made by the surgical and anesthesia teams in managing these contingencies.\n`;
    }

    return text;
}

// Export for use in index.html (attaches to window since we run in browser directly)
window.URO_CATEGORIES = URO_CATEGORIES;
window.URO_PROCEDURES = URO_PROCEDURES;
window.compileConsentText = compileConsentText;
window.compileMultipleConsentText = compileMultipleConsentText;
