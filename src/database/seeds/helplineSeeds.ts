/**
 * OneHelp — Helpline Seed Data
 *
 * Complete offline database of Indian emergency helplines.
 * Pre-populated on first install. No internet required.
 */

export interface HelplineSeed {
  name: string;
  number: string;
  category: string;
  regional_name?: string;
  state?: string;
}

export const SEED_HELPLINES: HelplineSeed[] = [
  // National Emergency
  { name: 'Emergency Response Support System', number: '112', category: 'police', regional_name: 'आपातकालीन प्रतिक्रिया', state: 'national' },
  { name: 'Police', number: '100', category: 'police', regional_name: 'पुलिस', state: 'national' },

  // Ambulance & Medical
  { name: 'Ambulance', number: '108', category: 'ambulance', regional_name: 'एम्बुलेंस', state: 'national' },
  { name: 'Emergency Medical Services', number: '102', category: 'ambulance', regional_name: 'आपातकालीन चिकित्सा', state: 'national' },
  { name: 'AIIMS Poison Control', number: '011-26589391', category: 'poison', regional_name: 'विष नियंत्रण', state: 'national' },
  { name: 'Blood Bank Helpline', number: '104', category: 'ambulance', regional_name: 'रक्त बैंक', state: 'national' },

  // Fire
  { name: 'Fire Brigade', number: '101', category: 'fire', regional_name: 'दमकल', state: 'national' },

  // Women Safety
  { name: 'Women Helpline', number: '1091', category: 'women', regional_name: 'महिला हेल्पलाइन', state: 'national' },
  { name: 'Women Helpline (Domestic Abuse)', number: '181', category: 'women', regional_name: 'महिला हेल्पलाइन (घरेलू हिंसा)', state: 'national' },
  { name: 'National Commission for Women', number: '7827-170-170', category: 'women', regional_name: 'राष्ट्रीय महिला आयोग', state: 'national' },

  // Child Safety
  { name: 'Child Helpline (Childline)', number: '1098', category: 'child', regional_name: 'चाइल्डलाइन', state: 'national' },
  { name: 'Missing Children', number: '1094', category: 'child', regional_name: 'लापता बच्चे', state: 'national' },

  // Cybercrime
  { name: 'Cybercrime Helpline', number: '1930', category: 'cybercrime', regional_name: 'साइबर अपराध', state: 'national' },
  { name: 'Cyber Crime Portal', number: '155260', category: 'cybercrime', regional_name: 'साइबर अपराध पोर्टल', state: 'national' },

  // Mental Health
  { name: 'iCall Psychosocial Helpline', number: '9152987821', category: 'mental_health', regional_name: 'आईकॉल मनोसामाजिक', state: 'national' },
  { name: 'Vandrevala Foundation Helpline', number: '1860-2662-345', category: 'mental_health', regional_name: 'वंद्रेवाला फाउंडेशन', state: 'national' },
  { name: 'NIMHANS Helpline', number: '080-46110007', category: 'mental_health', regional_name: 'निमहंस हेल्पलाइन', state: 'national' },
  { name: 'Snehi Helpline', number: '044-24640050', category: 'mental_health', regional_name: 'स्नेही हेल्पलाइन', state: 'national' },

  // Disaster
  { name: 'National Disaster Management Authority', number: '1078', category: 'disaster', regional_name: 'राष्ट्रीय आपदा प्रबंधन प्राधिकरण', state: 'national' },
  { name: 'Disaster Management (State)', number: '1070', category: 'disaster', regional_name: 'आपदा प्रबंधन (राज्य)', state: 'national' },

  // Animal & Wildlife
  { name: 'Wildlife SOS', number: '1962', category: 'animal', regional_name: 'वन्यजीव एसओएस', state: 'national' },
  { name: 'Animal Cruelty Helpline', number: '1962', category: 'animal', regional_name: 'पशु क्रूरता हेल्पलाइन', state: 'national' },

  // Transport & Coast Guard
  { name: 'Indian Coast Guard', number: '1554', category: 'disaster', regional_name: 'भारतीय तटरक्षक', state: 'national' },
  { name: 'Railway Accident Emergency', number: '1072', category: 'disaster', regional_name: 'रेलवे दुर्घटना', state: 'national' },
  { name: 'Road Accident Emergency', number: '1073', category: 'ambulance', regional_name: 'सड़क दुर्घटना', state: 'national' },
  { name: 'National Highway Helpline', number: '1033', category: 'disaster', regional_name: 'राष्ट्रीय राजमार्ग', state: 'national' },

  // Anti-corruption & Other
  { name: 'Anti-Corruption Helpline', number: '1031', category: 'police', regional_name: 'भ्रष्टाचार विरोधी', state: 'national' },
  { name: 'Senior Citizens Helpline', number: '14567', category: 'mental_health', regional_name: 'वरिष्ठ नागरिक हेल्पलाइन', state: 'national' },
  { name: 'Tourist Helpline', number: '1363', category: 'police', regional_name: 'पर्यटक हेल्पलाइन', state: 'national' },
  { name: 'LPG Gas Leak Helpline', number: '1906', category: 'fire', regional_name: 'एलपीजी गैस रिसाव', state: 'national' },
  { name: 'Electricity Emergency', number: '1912', category: 'fire', regional_name: 'बिजली आपातकालीन', state: 'national' },

  // State-specific (Maharashtra)
  { name: 'Maharashtra Police', number: '100', category: 'police', regional_name: 'महाराष्ट्र पुलिस', state: 'maharashtra' },
  { name: 'Mumbai Police Control Room', number: '022-22621855', category: 'police', regional_name: 'मुंबई पुलिस कंट्रोल रूम', state: 'maharashtra' },
  { name: 'Brihanmumbai Fire Brigade', number: '022-23076111', category: 'fire', regional_name: 'बृहन्मुंबई दमकल', state: 'maharashtra' },

  // State-specific (Delhi)
  { name: 'Delhi Police', number: '011-23490200', category: 'police', regional_name: 'दिल्ली पुलिस', state: 'delhi' },
  { name: 'Delhi Fire Service', number: '011-23414000', category: 'fire', regional_name: 'दिल्ली अग्निशमन', state: 'delhi' },
  { name: 'Delhi Women Safety', number: '011-23317004', category: 'women', regional_name: 'दिल्ली महिला सुरक्षा', state: 'delhi' },

  // State-specific (Karnataka)
  { name: 'Bangalore City Police', number: '080-22942222', category: 'police', regional_name: 'ಬೆಂಗಳೂರು ಪೊಲೀಸ್', state: 'karnataka' },
  { name: 'Karnataka State Disaster', number: '1077', category: 'disaster', regional_name: 'ಕರ್ನಾಟಕ ರಾಜ್ಯ ವಿಪತ್ತು', state: 'karnataka' },

  // State-specific (Tamil Nadu)
  { name: 'Chennai Police', number: '044-23452350', category: 'police', regional_name: 'சென்னை காவல்', state: 'tamilnadu' },
  { name: 'TN Fire & Rescue', number: '044-25384000', category: 'fire', regional_name: 'தீயணைப்பு மற்றும் மீட்பு', state: 'tamilnadu' },

  // State-specific (West Bengal)
  { name: 'Kolkata Police', number: '033-22145060', category: 'police', regional_name: 'কলকাতা পুলিশ', state: 'westbengal' },

  // State-specific (Gujarat)
  { name: 'Gujarat Police', number: '079-23250798', category: 'police', regional_name: 'ગુજરાત પોલીસ', state: 'gujarat' },
  { name: 'Gujarat Disaster Management', number: '079-23251900', category: 'disaster', regional_name: 'ગુજરાત આપત્તિ વ્યવસ્થાપન', state: 'gujarat' },
];
