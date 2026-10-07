/**
 * OfflineAIService.ts
 * 
 * On-Device Emergency Conversational Engine for OneHelp.
 * Operates 100% offline with zero internet, zero cloud dependencies.
 * Provides natural, human-like clinical and emergency assistance in Hindi, Hinglish, and English.
 */

import { useLocationStore } from '../store/useLocationStore';
import { useDeviceStatusStore } from '../store/useDeviceStatusStore';

export interface AIResponseMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
}

export const OfflineAIService = {
  processQuery: async (userQuery: string): Promise<AIResponseMessage> => {
    const q = userQuery.toLowerCase().trim();
    const loc = useLocationStore.getState();
    const dev = useDeviceStatusStore.getState();
    const currentLocText = loc.address || (loc.location ? `${loc.location.latitude.toFixed(4)}°, ${loc.location.longitude.toFixed(4)}°` : 'Location acquired');

    const now = new Date();
    const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

    // 1. GREETINGS & CASUAL
    if (q === 'hi' || q === 'hello' || q === 'hey' || q === 'namaste' || q.includes('kaise ho')) {
      return {
        id: Date.now().toString(),
        sender: 'ai',
        timestamp: timeStr,
        text: `Namaste! Main OneHelp ka Offline Emergency Assistant hoon. 

Main aapke phone me bina internet ke chalta hoon. Agar koi medical emergency, accident, disaster ya personal threat ho, to aap mujhse seedha Hindi ya English me pooch sakte hain. 

Aapko abhi kis cheez me madad chahiye?`,
      };
    }

    if (q.includes('thank') || q.includes('dhanyawad') || q.includes('shukriya')) {
      return {
        id: Date.now().toString(),
        sender: 'ai',
        timestamp: timeStr,
        text: `Aapka swagat hai. Apna dhyan rakhein aur surakshit rahein. Kisi bhi emergency me main hamesha offline available hoon.`,
      };
    }

    // 2. SNAKE BITE / SAAP
    if (q.includes('snake') || q.includes('saap') || q.includes('saanp') || q.includes('dhas')) {
      return {
        id: Date.now().toString(),
        sender: 'ai',
        timestamp: timeStr,
        text: `Agar saap ne kaat liya hai, to sabse pehle ghabraiye mat — lagbhag 70% saap zehreelay nahi hote ya dry bite karte hain.

Aapko turant ye steps follow karne hain:
• Vyakti ko bilkul shaant rakhein aur chalne-phirne na dein, kyunki hilne-dulne se dil tezi se dhadakta hai aur zeher shareer me tezi se failta hai.
• Kaati hui jagah (haath ya paer) se ghadi, ring, ya tight kapde turant utaar dein, kyunki wahan sujan (swelling) aayegi.
• Bite wale hisse ko dil ke level se neeche rakhein.
• Ghav ko saaf paani se halka dho lein aur saaf kapde se halka cover karein.

Dhyan rahe: Ghav par cheera lagana, muh se zeher choosna, ya taar/rassi se tight baandhna bilkul galat aur jaanleva hai. Turant nazdeeki government hospital le jayein jahan Anti-Snake Venom (ASV) injection available ho.`,
      };
    }

    // 3. CPR / CARDIAC ARREST / DIL KA DAURA / BEHOSH
    if (q.includes('cpr') || q.includes('heart') || q.includes('dil') || q.includes('cardiac') || q.includes('behosh') || q.includes('unconscious') || q.includes('saans')) {
      return {
        id: Date.now().toString(),
        sender: 'ai',
        timestamp: timeStr,
        text: `Agar vyakti behosh hai aur saans nahi le raha, to turant CPR shuru karein — har ek second keemti hai:

1. Response check karein: Kandhe thapthapayein aur zor se puchein "Kya aap theek hain?". Agar koi harkat na ho, to turant 108 Ambulance ko call karwayein.
2. Haath ki position: Apne dono haath vyakti ki chhaati ke theek beech me (breastbone par) ek ke upar ek rakhein.
3. Chhaati dabayein (Chest Compressions):
   • Chhaati ko lagbhag 2 se 2.5 inch gehra dabayein.
   • Speed: 100 se 120 beats per minute (tez aur lagataar dabayein).
   • 30 baar chhaati dabayein, fir 2 baar muh se saans dein (agar akele hain to lagataar chhaati dabate rahein).

Jab tak ambulance na aaye ya vyakti hosh me na aaye, compressions rokein mat.`,
      };
    }

    // 4. BLEEDING / KHOON
    if (q.includes('bleed') || q.includes('khoon') || q.includes('wound') || q.includes('chot') || q.includes('cut')) {
      return {
        id: Date.now().toString(),
        sender: 'ai',
        timestamp: timeStr,
        text: `Khoon rokne ke liye sabse zaroori cheez hai Direct Pressure:

• Kisi saaf kapde, towel ya bandage se ghav par dono haatho se lagataar 10-15 minute tak zor se dabayein.
• Kapde ko utha-utha kar baar-baar mat dekhein ki khoon ruka ya nahi. Agar kapda bheenj jaye to uske upar ek aur kapda rakh kar dabayein.
• Agar chot haath ya paer me hai aur haddi nahi tooti hai, to us ang ko dil ke level se upar utha kar rakhein.
• Agar khoon pichkari ki tarah phoot raha ho (Arterial Bleed), to ghav ke 2-3 inch upar tight kapda ya belt baandhein (Tourniquet) aur turant hospital bhaagein.

Ghav me dhasa hua koi bada kanch ya loha khud se bahar na nikalein.`,
      };
    }

    // 5. CHOKING / GALE ME PHANSA
    if (q.includes('chok') || q.includes('atki') || q.includes('phansa') || q.includes('gale')) {
      return {
        id: Date.now().toString(),
        sender: 'ai',
        timestamp: timeStr,
        text: `Gale me kuch phansne par agar vyakti bol ya saans nahi le pa raha hai:

1. Peeth par 5 baar maarein (Back Blows):
   • Vyakti ko aage ki taraf jhukayein.
   • Dono kandho ke beech apni hatheli ke pichle hisse se 5 baar zor se maarein.

2. Heimlich Maneuver:
   • Vyakti ke peeche khade ho kar apne dono haath uske pet par, naabhi (navel) ke theek upar rakhein.
   • Mutthi bana kar andar aur upar ki taraf (J-shape me) 5 baar zor se jhatka dein.

Ye cycle tab tak repeat karein jab tak phansi hui cheez bahar na nikal jaye. Agar vyakti behosh ho jaye to turant zameen par lita kar CPR shuru karein.`,
      };
    }

    // 6. GAS CYLINDER LEAK / LPG
    if (q.includes('gas') || q.includes('cylinder') || q.includes('lpg') || q.includes('leak')) {
      return {
        id: Date.now().toString(),
        sender: 'ai',
        timestamp: timeStr,
        text: `LPG Cylinder leak me sabse bada khatra aag ya blast ka hota hai:

Sabse pehle ye bilkul mat karein:
• Koi bhi bijli ka switch ON ya OFF bilkul na karein (switch ke tiny spark se bhi gas me aag lag sakti hai).
• Matchstick, lighter ya agarbatti bilkul na jalayein.
• Room ke andar phone use na karein.

Turant ye karein:
1. Ghar ke sabhi darwaaze aur khidkiyan poori tarah khol dein taaki gas bahar nikal sake.
2. Cylinder ke regulator ko band karein aur safety cap laga dein.
3. Sabhi logo ko ghar se bahar khuli hawa me le jayein.
4. Bahar nikal kar Gas Helpline 1906 ya Fire 101 par call karein.`,
      };
    }

    // 7. FIRE / AAG / BURNS
    if (q.includes('fire') || q.includes('aag') || q.includes('burn') || q.includes('dhuan') || q.includes('jal')) {
      return {
        id: Date.now().toString(),
        sender: 'ai',
        timestamp: timeStr,
        text: `Aag aur jalne ki sthiti me:

Aag lagne par:
• Dhuaan hamesha upar uthta hai, isliye zameen par rengte hue (crawl karte hue) bahar nikalein.
• Naak aur muh par geela kapda baandh lein.
• Kabhi bhi LIFT ka use na karein, sirf seedhiyo se jayein.
• Agar kapdo me aag lag jaye to Stop, Drop and Roll (bhagein mat, zameen par let kar ghoomein).

Agar skin jal gayi ho:
• Jale hue hisse par 15-20 minute tak behata hua sadharan thanda paani dalein.
• Barf (ice), toothpaste ya tel bilkul na lagayein, isse tissue damage hota hai.
• Faphole (blisters) ko kabhi na phodein.`,
      };
    }

    // 8. EARTHQUAKE / BHOOKAMP
    if (q.includes('earthquake') || q.includes('bhookamp') || q.includes('bhukamp') || q.includes('hil')) {
      return {
        id: Date.now().toString(),
        sender: 'ai',
        timestamp: timeStr,
        text: `Bhookamp ke jhatke aane par 'Drop, Cover, and Hold' ka niyam yaad rakhein:

1. Drop (Neeche jhukein): Apne haatho aur ghutno ke bal zameen par baith jayein.
2. Cover (Sir dhakein): Kisi majboot mez (table) ya bed ke neeche ghus kar apne sir aur gardan ko bachayein.
3. Hold (Pakad kar rakhein): Jab tak jhatke rukein nahi, table ko pakde rahein.

Agar aap bahar hain to imarato, pedo aur bijli ke khambho se door khule maidan me khade ho jayein. Jhatke rukne ke baad lift ki jagah seedhiyo se bahar nikalein.`,
      };
    }

    // 9. STALKING / SUSPICIOUS PERSON / PEECHA / DANGER
    if (q.includes('follow') || q.includes('peecha') || q.includes('stalk') || q.includes('dar') || q.includes('unsafe') || q.includes('threat')) {
      return {
        id: Date.now().toString(),
        sender: 'ai',
        timestamp: timeStr,
        text: `Agar koi aapka peecha kar raha hai ya aapko khatra mehsoos ho raha hai:

• Sunsaan galiyo me akele mat jayein. Turant kisi roshni wali dukaan, petrol pump, metro station ya restaurant me ghus jayein.
• Fake Call ka use karein aur phone par zor se baat karein jaise aap kisi police officer ya family member se baat kar rahe hain: "Haan main bus stop par khada hoon, aap 2 minute me aa rahe ho na?".
• Agar darr lag raha hai to seedha kisi dukaan-daar ya aas-paas ke logo ko bole: "Ye aadmi mera peecha kar raha hai, please meri madad kijiye."
• Direct danger me OneHelp ka 120dB Siren bajayein aur 112 par call karein.

Aapka GPS location active hai (${currentLocText}), zaroorat padne par SOS trigger karein.`,
      };
    }

    // 10. POLICE & LEGAL RIGHTS / ZERO FIR
    if (q.includes('police') || q.includes('fir') || q.includes('arrest') || q.includes('kanoon') || q.includes('right')) {
      return {
        id: Date.now().toString(),
        sender: 'ai',
        timestamp: timeStr,
        text: `Bhartiya kanoon ke anusar aapke mukhya adhikar:

1. Zero FIR: Agar ghatna kisi doosre shehar ya thane ke ilaqe me hui hai, tab bhi koi bhi police station FIR darj karne se mana nahi kar sakta.
2. Mahilaon ke adhikar: Section 46 CrPC ke tahat mahila ko suraj dhalne ke baad aur suraj nikalne se pehle magistrate ke order ke bina arrest nahi kiya ja sakta, aur sirf lady police officer hi arrest kar sakti hai.
3. Medical Emergency (Good Samaritan Law): Kisi bhi accident victim ko hospital lane par police ya hospital pehle ilaaj shuru karegi, FIR ya court ke chakkar me ilaaj nahi roka ja sakta.
4. Arrest hone par adhikar: Aapko turant apne vakeel ya parivaar ko call karne ka qanooni haq hai.`,
      };
    }

    // 11. ELECTRIC SHOCK / BIJLI
    if (q.includes('electric') || q.includes('shock') || q.includes('current') || q.includes('bijli')) {
      return {
        id: Date.now().toString(),
        sender: 'ai',
        timestamp: timeStr,
        text: `Bijli ka current lagne par:

• Sabse pehle ghar ka Main MCB / Power Switch turant band karein.
• Victim ko apne nange haatho se seedha mat chhooie. Lakdi (dry wood), plastic ki dandi ya sukhe kapde se victim ko taar se alag karein.
• Current alag hone ke baad check karein ki kya vyakti saans le raha hai. Agar saans nahi hai to turant CPR shuru karein.
• Jali hui jagah par saaf sukha kapda daal kar hospital le jayein.`,
      };
    }

    // 12. FRACTURE / TOOTI HADDI / MOCH
    if (q.includes('fracture') || q.includes('haddi') || q.includes('moch') || q.includes('sprain') || q.includes('bone')) {
      return {
        id: Date.now().toString(),
        sender: 'ai',
        timestamp: timeStr,
        text: `Haddi tootne (Fracture) ya moch aane par:

• Toote hue ang ko bilkul hilayein mat. Kisi lakdi, scale ya card-board ko kapde se baandh kar ang ko seedha sahara dein (Splint).
• Moch par R.I.C.E formula use karein:
  - Rest (Aaram karein)
  - Ice (Barf ki sikai kapde me lapet kar karein)
  - Compression (Crepe bandage halki baandhein)
  - Elevation (Pair ya haath ko takiye par uncha rakhein)
• Tooti hui haddi ko khud seedha karne ki koshish na karein, turant X-ray karwayein.`,
      };
    }

    // 13. DOG BITE / KUTTE KA KAATNA / RABIES
    if (q.includes('dog') || q.includes('kutta') || q.includes('rabies') || q.includes('animal')) {
      return {
        id: Date.now().toString(),
        sender: 'ai',
        timestamp: timeStr,
        text: `Kutte ya kisi janwar ke kaatne par:

1. Sabse zaroori step: Ghav ko behate hue paani aur sabun (soap) se lagataar 15 minute tak acche se dhoiye. Sabun rabies ke virus ko kaafi hadd tak destroy karta hai.
2. Dettol ya Betadine lagayein. Ghav par patti ya bandage tightly mat baandhein (ise khula ya loose cover rakhein).
3. Turant 24 ghante ke andar government hospital jakar Anti-Rabies Vaccine (ARV) aur Tetanus ka injection lagwayein. Rabies 100% fatal bimari hai, isliye injection lagwana mandatory hai.`,
      };
    }

    // 14. DROWNING / PAANI ME DOOBNA
    if (q.includes('drown') || q.includes('doob') || q.includes('water')) {
      return {
        id: Date.now().toString(),
        sender: 'ai',
        timestamp: timeStr,
        text: `Paani me doobe vyakti ko bahar nikalne par:

1. Pehle dekhein kya vyakti saans le raha hai.
2. Agar saans nahi le raha to turant 5 baar muh se saans (Rescue Breaths) dein.
3. Fir 30 compressions aur 2 breaths ka CPR cycle shuru karein.
4. Patient ke pet se paani nikalne ke liye pet dabane ki koshish na karein (isse vomiting ho sakti hai aur lungs me ja sakti hai), seedha CPR par focus karein.
5. Geelay kapde nikal kar warm kambal me lapetein aur hospital le jayein.`,
      };
    }

    // 15. SEIZURE / MIRGI / DAURA
    if (q.includes('seizure') || q.includes('mirgi') || q.includes('daura') || q.includes('fits')) {
      return {
        id: Date.now().toString(),
        sender: 'ai',
        timestamp: timeStr,
        text: `Mirgi ya daura (Seizure) aane par:

• Vyakti ko zameen par aaram se letayein aur sir ke neeche naram takiya ya kapda rakhein.
• Aas-paas ki nukili cheezein hata dein taaki chot na lage.
• Vyakti ko karwat (side recovery position) me ghumayein taaki thook ya vomiting se saans na ruke.
• Dhyan rahe: Muh me chammach, ungli ya joota soonghana bilkul galat aur harmful hai. Vyakti ko zabardasti pakadne ki koshish na karein, daura aamtaur par 1-3 minute me khud shaant ho jata hai.`,
      };
    }

    // 16. GENERAL / FALLBACK INTELLIGENT CLINICAL TRIAGE
    return {
      id: Date.now().toString(),
      sender: 'ai',
      timestamp: timeStr,
      text: `Maine aapka sawal samjha: "${userQuery}".

Kisi bhi emergency ya medical condition me primary rule hota hai:
1. Patient ke hosh (responsiveness) aur saans (breathing) check karein.
2. Agar chot lagi hai to saaf kapde se direct dabav bana kar khoon rokein.
3. Patient ko aaramdayak sthiti me lita kar halka garam rakhein.
4. Agar sthiti gambhir hai to bina deri kiye 108 Ambulance ya 112 par call karein.

Aap specific sawal pooch sakte hain jaise saap ka kaatna, CPR, gas leak, jalna, fracture, ya police rights.`,
    };
  },
};
