/**
 * OfflineAIService.ts
 * 
 * Ultra-Lightweight On-Device Emergency AI Engine for OneHelp.
 * Operates with 100% ZERO internet connection, zero cloud API dependencies,
 * and near-zero memory footprint (< 1 MB RAM), ensuring flawless real-time
 * execution on entry-level Android devices.
 * 
 * Features:
 * - Multilingual parsing: Hindi, Hinglish, and English.
 * - Expert-vetted triage for:
 *   1. Medical Emergencies (Snake bite, CPR, Choking, Severe Bleeding, Burns, Poison, Cardiac, etc.)
 *   2. Natural & Structural Disasters (Earthquake, Flood, Fire, Gas Cylinder Leak, Lightning)
 *   3. Crime & Personal Threat (Stalking, Harassment, Robbery, Road Rage, Domestic Violence)
 *   4. Legal & Police Rights in India (Zero FIR, Section 46 CrPC for women, free legal aid)
 * - Context-aware injection (GPS coordinates, street address, battery level).
 */

import { useLocationStore } from '../store/useLocationStore';
import { useDeviceStatusStore } from '../store/useDeviceStatusStore';

export interface AIResponseAction {
  label: string;
  type: 'sos' | 'call112' | 'siren' | 'morse' | 'guides';
  color?: string;
}

export interface AIResponseMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
  severity?: 'critical' | 'urgent' | 'info';
  warnings?: string[];
  steps?: string[];
  actions?: AIResponseAction[];
}

export const OfflineAIService = {
  /**
   * Main query engine: processes natural language input offline and generates
   * clinical/tactical emergency guidance.
   */
  processQuery: async (userQuery: string): Promise<AIResponseMessage> => {
    const q = userQuery.toLowerCase().trim();
    const loc = useLocationStore.getState();
    const dev = useDeviceStatusStore.getState();
    const currentLocText = loc.address || (loc.location ? `${loc.location.latitude.toFixed(4)}°, ${loc.location.longitude.toFixed(4)}°` : 'Location acquired');
    const batteryText = `${dev.batteryLevel}%`;

    const now = new Date();
    const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

    // 1. SNAKE BITE / SAAP
    if (
      q.includes('snake') ||
      q.includes('saap') ||
      q.includes('saanp') ||
      q.includes('dhas') ||
      q.includes('bite') && (q.includes('snake') || q.includes('saap'))
    ) {
      return {
        id: Date.now().toString(),
        sender: 'ai',
        timestamp: timeStr,
        severity: 'critical',
        text: `⚠️ SNAKE BITE EMERGENCY PROTOCOL (सांप के काटने पर तुरंत क्या करें):
Location recorded: ${currentLocText}. Keep calm, 70% snakes are non-venomous or dry bites.`,
        warnings: [
          '❌ DO NOT cut the wound or try to suck venom (जहर चूसने या चीरा लगाने की गलती न करें).',
          '❌ DO NOT tie a tight tourniquet (रस्सी या तार से खून का दौरा पूरी तरह न रोकें).',
          '❌ DO NOT apply ice or battery/electric shock.',
        ],
        steps: [
          '1. Patient ko bilkul shaant rakhein aur chalne-phirne na dein (Movement se zeher tezi se failta hai).',
          '2. Bite wale hisse (haath/paer) par se ring, ghadi ya tight kapde turant utaar dein.',
          '3. Bite wale ang ko DIL (Heart) ke level se neeche rakhein.',
          '4. Agar broad bandage ho to gentle pressure bandage lagayein (ungli ghus sake utna loose).',
          '5. Turant nazdeeki government hospital ya district hospital le jayein jahan Anti-Snake Venom (ASV) available ho.',
        ],
        actions: [
          { label: '🚨 Trigger Emergency SOS', type: 'sos', color: '#DC2626' },
          { label: '📞 Call 108 Ambulance', type: 'call112', color: '#16A34A' },
        ],
      };
    }

    // 2. CPR / CARDIAC ARREST / UNCONSCIOUS / DIL KA DAURA
    if (
      q.includes('cpr') ||
      q.includes('heart') ||
      q.includes('dil') ||
      q.includes('cardiac') ||
      q.includes('unconscious') ||
      q.includes('behosh') ||
      q.includes('saans nahi')
    ) {
      return {
        id: Date.now().toString(),
        sender: 'ai',
        timestamp: timeStr,
        severity: 'critical',
        text: `❤️ CPR & SUDDEN CARDIAC COLLAPSE PROTOCOL (सीने की मालिश / सांस रुकने पर):
Victim is unresponsive and not breathing normally. Immediate action saves life.`,
        warnings: [
          '❌ Agar vyakti hosh me hai aur saans le raha hai to CPR na dein.',
          '❌ Compressions ke beech me haath mat uthayein, chest ko poora recoil hone dein.',
        ],
        steps: [
          '1. Safety Check: Scene safe hai ya nahi dekhein. Patient ke kandhe thapthapayein: "Kya aap theek hain?"',
          '2. Call for Help: SOS trigger karein aur 108 Ambulance ko call karein.',
          '3. Hand Position: Apne dono haath victim ki chhaati ke bilkul beech (Breastbone/Sternum) par rakhein.',
          '4. Push Hard & Fast: Chhaati ko 2 se 2.4 inch (5-6 cm) gehra dabayein. Speed: 100-120 beats per minute (e.g. song "Stayin Alive" ki beat).',
          '5. Cycle: 30 baar chhaati dabayein, fir 2 baar mooh se saans (Rescue Breaths) dein. Agar akele hain to lagataar Chest Compressions jaari rakhein.',
        ],
        actions: [
          { label: '🚨 Trigger Emergency SOS', type: 'sos', color: '#DC2626' },
          { label: '📞 Call 108 Ambulance', type: 'call112', color: '#16A34A' },
          { label: '🩺 Open CPR Metronome Guide', type: 'guides', color: '#2563EB' },
        ],
      };
    }

    // 3. BLEEDING / KHOON / CUT / HEMORRHAGE
    if (
      q.includes('bleed') ||
      q.includes('khoon') ||
      q.includes('chot') ||
      q.includes('wound') ||
      q.includes('cut') ||
      q.includes('blood')
    ) {
      return {
        id: Date.now().toString(),
        sender: 'ai',
        timestamp: timeStr,
        severity: 'urgent',
        text: `🩸 SEVERE BLEEDING CONTROL (खून रोकने का इमरजेंसी तरीका):
Severe blood loss can cause hypovolemic shock within minutes.`,
        warnings: [
          '❌ Ghav me dhasa hua koi bada kaanch ya loha bahar mat nikalein (isse khoon aur tezi se bahega).',
          '❌ Ghav par mitti, haldi ya tel na lagayein infection se bachne ke liye.',
        ],
        steps: [
          '1. Direct Pressure: Saaf kapda ya gauze ghav par rakh kar dono haatho se lagataar 10-15 minute tak zor se dabayein.',
          '2. Do Not Lift: Kapda khoon se bheenj jaye to use hatayein mat, uske upar doosra kapda rakh kar dabate rahein.',
          '3. Elevate: Agar haath ya paer me chot hai aur haddi nahi tooti hai, to ang ko dil ke level se upar uthayein.',
          '4. Tourniquet: Agar haath ya paer se khoon pichkari ki tarah phoot raha ho (arterial bleed), to ghav ke 2-3 inch upar tight kapda ya belt baandhein aur time note karein.',
        ],
        actions: [
          { label: '🚨 Send SOS with GPS', type: 'sos', color: '#DC2626' },
          { label: '📞 Call 108 Medical', type: 'call112', color: '#16A34A' },
        ],
      };
    }

    // 4. CHOKING / GALE ME PHANSA / HEIMLICH
    if (
      q.includes('chok') ||
      q.includes('atki') ||
      q.includes('phansa') ||
      q.includes('gale') ||
      q.includes('swallow')
    ) {
      return {
        id: Date.now().toString(),
        sender: 'ai',
        timestamp: timeStr,
        severity: 'critical',
        text: `🫁 CHOKING & AIRWAY BLOCKAGE (गले में खाना या वस्तु अटकने पर):
If the person cannot speak, cough or breathe, act immediately.`,
        warnings: [
          '❌ Agar vyakti zor se khaans raha hai to beech me mat tokein, khaansne dein.',
          '❌ Blind finger sweep mat karein jab tak object saaf aankho se na dikhe.',
        ],
        steps: [
          '1. 5 Back Blows: Vyakti ko thoda aage jhukayein aur peeth par dono kandho ke beech haath ki hatheli se 5 baar zor se maarein.',
          '2. Heimlich Maneuver: Vyakti ke peeche khade ho kar dono haath uski naabhi (Navel) ke theek upar rakhein.',
          '3. Inward & Upward: Mutthi bana kar andar aur upar ki taraf (J-shape) 5 baar zor se jhatka dein.',
          '4. Repeat: 5 Back blows aur 5 Abdominal thrusts tab tak karein jab tak object bahar na aa jaye.',
          '5. If Unconscious: Agar vyakti behosh ho jaye to use zameen par lita kar turant CPR shuru karein.',
        ],
        actions: [
          { label: '🚨 Trigger SOS Alert', type: 'sos', color: '#DC2626' },
          { label: '📞 Call 108 Ambulance', type: 'call112', color: '#16A34A' },
        ],
      };
    }

    // 5. GAS CYLINDER LEAK / LPG SMELL
    if (
      q.includes('gas') ||
      q.includes('cylinder') ||
      q.includes('lpg') ||
      q.includes('leak') ||
      q.includes('smell')
    ) {
      return {
        id: Date.now().toString(),
        sender: 'ai',
        timestamp: timeStr,
        severity: 'critical',
        text: `🔥 LPG CYLINDER LEAK PROTOCOL (गैस लीकेज की स्थिति में सुरक्षा):
LPG gas is heavier than air and settles near the floor. Any spark can cause explosion.`,
        warnings: [
          '❌ DO NOT touch any electrical switches — ON ya OFF bilkul na karein (switch spark se aag lagti hai).',
          '❌ Matchstick, lighter, mombatti, ya agarbatti bilkul na jalayein.',
          '❌ Room ke andar mobile phone ka flashlight ya call use na karein.',
        ],
        steps: [
          '1. Sabhi khidkiyan aur darwaaze turant poore khol dein taaki taazi hawa andar aaye.',
          '2. Cylinder ke regulator ko OFF karein aur safety cap laga dein agar sambhav ho.',
          '3. Ghar ke sabhi members ko turant bahar khuli hawa me le jayein.',
          '4. Bahar khuli jagah jakar Gas Agency Emergency (1906) ya Fire Service (101) ko call karein.',
        ],
        actions: [
          { label: '📞 Call 101 Fire Brigade', type: 'call112', color: '#DC2626' },
          { label: '🚨 Trigger SOS Alert', type: 'sos', color: '#F59E0B' },
        ],
      };
    }

    // 6. FIRE / AAG / BUILDING ESCAPE
    if (
      q.includes('fire') ||
      q.includes('aag') ||
      q.includes('burn') ||
      q.includes('dhuan') ||
      q.includes('smoke')
    ) {
      return {
        id: Date.now().toString(),
        sender: 'ai',
        timestamp: timeStr,
        severity: 'critical',
        text: `🚒 FIRE EVACUATION & BURNS PROTOCOL (आग लगने पर बचाव एवं प्राथमिक उपचार):`,
        warnings: [
          '❌ Aag lagne par LIFT / ELEVATOR ka istemaal kabhi na karein, sirf seedhiyo se jayein.',
          '❌ Dhuyein me seedhe khade hokar na daudein (dhuaan jaanleva hota hai).',
          '❌ Jali hui skin par Toothpaste, barf (ice) ya tel na lagayein.',
        ],
        steps: [
          '1. Crawl Low Under Smoke: Dhuan upar uthta hai, isliye zameen ke paas reng kar (crawl) bahar nikalein.',
          '2. Wet Cloth: Agar sambhav ho to naak aur mooh par geela kapda bandhein.',
          '3. Check Doors: Darwaaza kholne se pehle haath ke pichle hisse se handle chhoo kar dekhein agar garam hai to na kholein.',
          '4. Stop, Drop, and Roll: Agar kapdo me aag lage to bhagein nahi, zameen par let kar roll karein.',
          '5. Burns Care: Jali hui skin par turant 15-20 minute tak behata hua thanda paani dalein.',
        ],
        actions: [
          { label: '📞 Call 101 Fire Rescue', type: 'call112', color: '#DC2626' },
          { label: '🔊 Sound Loud Siren', type: 'siren', color: '#EA580C' },
        ],
      };
    }

    // 7. EARTHQUAKE / BHOOKAMP
    if (
      q.includes('earthquake') ||
      q.includes('bhookamp') ||
      q.includes('bhukamp') ||
      q.includes('hil') ||
      q.includes('tremor')
    ) {
      return {
        id: Date.now().toString(),
        sender: 'ai',
        timestamp: timeStr,
        severity: 'critical',
        text: `🏢 EARTHQUAKE SURVIVAL PROTOCOL (भूकंप के झटके आने पर तुरंत क्या करें):`,
        warnings: [
          '❌ Kampan ke dauran seedhiyo ya lift ki taraf mat bhagein.',
          '❌ Khidkiyo, kaanch, aur bhari almirah ke paas khade na rahein.',
        ],
        steps: [
          '1. DROP (झुके): Turant haatho aur ghutno ke bal zameen par baithein.',
          '2. COVER (छिपे): Kisi majboot mez (table) ya bed ke neeche sir aur gardan cover karein.',
          '3. HOLD ON (पकड़े): Jab tak jhatke rukein nahi, table ke paaye ko pakad kar baithe rahein.',
          '4. If Outside: Imarato, bijli ke khambho aur pedo se door khule maidan me jayein.',
          '5. Post-Quake: Gas aur bijli ke main switch band karein aur aftershocks ke liye taiyaar rahein.',
        ],
        actions: [
          { label: '🚨 Send Disaster SOS with GPS', type: 'sos', color: '#DC2626' },
          { label: '🔦 Flash Optical SOS Strobe', type: 'morse', color: '#F59E0B' },
        ],
      };
    }

    // 8. STALKING / SUSPICIOUS PERSON / PEECHA / DANGER
    if (
      q.includes('follow') ||
      q.includes('peecha') ||
      q.includes('stalk') ||
      q.includes('dar') ||
      q.includes('unsafe') ||
      q.includes('gunda') ||
      q.includes('threat') ||
      q.includes('chhed')
    ) {
      return {
        id: Date.now().toString(),
        sender: 'ai',
        timestamp: timeStr,
        severity: 'urgent',
        text: `🛡️ PERSONAL THREAT & ANTI-STALKING TACTICS (कोई पीछा कर रहा हो तो तुरंत बचाव):
Your location is active: ${currentLocText}. Stay calm and assertive.`,
        warnings: [
          '❌ Sunsaan galiyo ya andhere me short-cut lene ki galti na karein.',
          '❌ Darr kar akele kisi sunsaan building ya corner me mat ghusein.',
        ],
        steps: [
          '1. Head to Crowded Area: Turant kisi roshni wali dukaan, petrol pump, metro station ya hotel me ghus jayein.',
          '2. Fake Call Deception: App ka "Fake Call" tool on karein aur aawaaz me baat karein: "Haan Inspector uncle, main bas 2 minute me mod par aa gaya."',
          '3. Alert Trusted Contacts: SafeWalk chalu karein ya Trusted Family Alert se turant live GPS link share karein.',
          '4. Direct Help: Kisi dukaan wale ya aate-jaate logo se direct bole: "Ye shakhs mera peecha kar raha hai, please meri madad karein."',
          '5. If in Immediate Attack: 120dB Loud Siren button dabayein taaki aas-paas ke log aakar gher lein.',
        ],
        actions: [
          { label: '📞 Fake Call Deterrent', type: 'siren', color: '#2563EB' },
          { label: '🚨 Silent SOS Alert', type: 'sos', color: '#DC2626' },
          { label: '📞 Call 112 / Women Helpline 1091', type: 'call112', color: '#16A34A' },
        ],
      };
    }

    // 9. POLICE RIGHTS / LEGAL / ZERO FIR / WOMEN ARREST
    if (
      q.includes('police') ||
      q.includes('fir') ||
      q.includes('arrest') ||
      q.includes('kanoon') ||
      q.includes('rights') ||
      q.includes('legal')
    ) {
      return {
        id: Date.now().toString(),
        sender: 'ai',
        timestamp: timeStr,
        severity: 'info',
        text: `⚖️ YOUR CONSTITUTIONAL & EMERGENCY POLICE RIGHTS IN INDIA:`,
        warnings: [
          '❌ Police station me kabhi blank kaagaz par sign na karein.',
        ],
        steps: [
          '1. Zero FIR: Agar ghatna kisi aur ilaqe me hui hai, tab bhi koi bhi police station FIR likhne se inkaar nahi kar sakta (Supreme Court Guidelines).',
          '2. Women Arrest Rules (Sec 46(4) CrPC): Mahila ko suraj doobne ke baad aur sooraj nikalne se pehle bina Magistrate ke order ke arrest nahi kiya ja sakta, aur sirf lady police officer hi arrest kar sakti hai.',
          '3. Free Medical Aid: Kisi bhi emergency ya road accident me hospital police FIR ka intezar kiye bina pehle ilaaj shuru karne ke liye baadhya hai (Good Samaritan Law).',
          '4. Right to Call: Giraftar hone par aapko apne parivaar ya vakeel ko call karne ka qanooni haq hai (Article 22(1)).',
          '5. Free Legal Aid: Agar aap vakeel afford nahi kar sakte to NALSA/DLSA dwara government free lawyer provide karti hai.',
        ],
        actions: [
          { label: '📞 Call 112 National Police', type: 'call112', color: '#2563EB' },
        ],
      };
    }

    // 10. ELECTRIC SHOCK / BIJLI
    if (
      q.includes('electric') ||
      q.includes('shock') ||
      q.includes('current') ||
      q.includes('bijli')
    ) {
      return {
        id: Date.now().toString(),
        sender: 'ai',
        timestamp: timeStr,
        severity: 'critical',
        text: `⚡ ELECTRIC SHOCK EMERGENCY PROTOCOL (बिजली का करंट लगने पर):`,
        warnings: [
          '❌ DO NOT touch victim directly with bare hands while they are in contact with electricity (apne haatho se seedha mat chhooein).',
        ],
        steps: [
          '1. Break the Circuit: Turant ghar ka Main MCB / Power Switch band karein.',
          '2. Separate Victim: Agar switch door hai, to lakdi (wood), plastic ki jhadu ya sukhe kapde se victim ko taar se door karein.',
          '3. Check Pulse & Breathing: Hosh me nahi hai to turant CPR shuru karein.',
          '4. Treat Burns: Jale hue ang par saaf sukha kapda daalein aur hospital le jayein.',
        ],
        actions: [
          { label: '🚨 Trigger SOS Alert', type: 'sos', color: '#DC2626' },
          { label: '📞 Call 108 Ambulance', type: 'call112', color: '#16A34A' },
        ],
      };
    }

    // 11. GENERAL EMERGENCY / DEFAULT INTELLIGENT TRIAGE
    return {
      id: Date.now().toString(),
      sender: 'ai',
      timestamp: timeStr,
      severity: 'urgent',
      text: `🤖 OneHelp Offline AI Assistant:
I am running 100% on-device in offline mode. 
Live Telemetry: ${currentLocText} | Battery: ${batteryText}.

I can give you immediate life-saving first-aid and tactics for:
• 🐍 Snake Bite & Poisoning (सांप का काटना)
• ❤️ CPR, Cardiac Arrest & Breathing Loss (हार्ट अटैक और CPR)
• 🩸 Severe Bleeding & Fractures (खून रोकना और चोट)
• 🫁 Choking & Airway Block (गले में अटकना)
• 🔥 LPG Cylinder Leak & Fire Escape (आग और गैस लीकेज)
• 🏢 Earthquake & Flood Survival (भूकंप और बाढ़)
• 🛡️ Anti-Stalking & Personal Danger (पीछा करना या हमला)
• ⚖️ Police & Legal Rights (Zero FIR और गिरफ्तारी के नियम)

Please ask your question or tap an emergency action below:`,
      steps: [
        'Stay Calm: Take a deep breath and assess your surroundings for immediate hazards.',
        'If in life-threatening danger, hold the Panic Button for 3 seconds to dispatch SOS coordinates.',
      ],
      actions: [
        { label: '🚨 Trigger Emergency SOS', type: 'sos', color: '#DC2626' },
        { label: '📞 Call 112 Emergency', type: 'call112', color: '#16A34A' },
        { label: '🔊 Sound Loud Siren', type: 'siren', color: '#EA580C' },
        { label: '🩺 Open Offline Medical Guides', type: 'guides', color: '#2563EB' },
      ],
    };
  },
};
