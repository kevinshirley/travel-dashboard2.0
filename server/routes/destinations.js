const express = require('express');
const router = express.Router();

router.get('/destinations', (req, res) => res.json({
  'Africa': {
    'continent': 'Africa',
    'pageSubTitle': 'A Destination for the Soul.',
    'pageDescription': 'Africa has a way of carving a place into your heart – the indescribable beauty of everything from the sweeping savannah plains to the majestic wildlife is enough to leave you craving for more. Its people and their welcoming smiles invite you to discover a continent as exciting as it is peaceful. Whether you are exploring the bustling cities or sleeping in a luxury lodge under the stars, you will find that Africa is not just a destination, but also a feeling that will stay with you for a lifetime.',
    'countries': {
      'Algeria': {},
      'Angola': {},
      'Benin': {},
      'Botswana': {},
      'Cameroon': {},
      'Cape Verde': {},
      'Comoros': {},
      'Côte d\'Ivoire': {},
      'Democratic Republic of the Congo': {},
      'Egypt': {},
      'Ethiopia': {},
      'Gambia': {},
      'Ghana': {},
      'Guinea-Bissau': {},
      'Kenya': {},
      'Madagascar': {},
      'Malawi': {},
      'Mauritius': {},
      'Mayotte': {},
      'Morocco': {},
      'Mozambique': {},
      'Namibia': {},
      'Réunion': {},
      'Rwanda': {},
      'Sao Tome And Principe': {},
      'Senegal': {},
      'Seychelles': {},
      'Sierra Leone': {},
      'South Africa': {},
      'Sudan': {},
      'Swaziland': {},
      'Tanzania': {},
      'Togo': {},
      'Tunisia': {},
      'Uganda': {},
      'Western Sahara': {},
      'Zambia': {},
      'Zimbabwe': {}
    }
  },
  'Antarctica': {
    'continent': 'Antarctica',
    'pageSubTitle': 'Pristine Nature.',
    'pageDescription': 'The coldest, driest continent on Earth with the highest average elevation, this is not a location with any actual residents, much less cities. But, that’s part of the reason Antarctica is home to some of the most breathtaking scenery and unique wildlife you’ll ever see. From November to March, visitors can travel through the Arctic Sound, a.k.a. Iceberg Alley, where they’ll see spectacular 10,000-year-old glaciers, their colors ranging from brilliant white to deep aquamarine. Also a must-see are the volcanic South Shetland Islands—Zodiac excursions get travelers close to the action while spotting humpback whales and emperor penguins.',
    'countries': {
      'Antartica': {},
      'French Southern Territories': {}
    }
  },
  'Asia': {
    'continent': 'Asia',
    'pageSubTitle': 'From Ancient Civilizations to Modern Landscapes.',
    'pageDescription': 'History lovers and spiritual seekers will wind their way throughout this ancient land, discovering a world of tradition and culture. Asia’s largest cities, such as Hong Kong, Singapore, and Tokyo, offer stunning marvels of engineering and technology. They embody the constant innovation of a modern world showing no signs of slowing down. Visit Shanghai, China’s largest city, whose futuristic-looking skyline is in stark contrast to the city’s Bund riverside district, a slice of old Shanghai. Roam the 13th century streets of Hanoi’s Old Quarter, experience a sunrise in Siem Reap as the sun casts a glow over old temples and ruins, or tour Bangkok’s golden palaces, floating markets, and spectacular porcelain-laid spires.',
    'countries': {
      'Bahrain': {},
      'Bangladesh': {},
      'Bhutan': {},
      'Brunei Darussalam': {},
      'Cambodia': {},
      'China': {},
      'India': {},
      'Indonesia': {},
      'Israel': {},
      'Japan': {},
      'Jordan': {},
      'Laos': {},
      'Malaysia': {},
      'Maldives': {},
      'Mongolia': {},
      'Myanmar': {},
      'Nepal': {},
      'Oman': {},
      'Palestine': {},
      'Philippines': {},
      'Qatar': {},
      'Singapore': {},
      'South Korea': {},
      'Sri Lanka': {},
      'Taiwan': {},
      'Tajikistan': {},
      'Thailand': {},
      'Uzbekistan': {},
      'Vietnam': {}
    }
  },
  'Carribean': {
    'continent': 'Carribean',
    'pageSubTitle': 'A Turquoise Retreat',
    'pageDescription': 'The Caribbean is all about crystal-clear water and idyllic, palm-fringed beaches. Take your island pick – sway to the reggae beats of Jamaica or bathe in the crystal blue waters of St. Bart\'s where the ocean meets the sky. This sun-kissed paradise is also home to tropical forests, waterfalls, and great hiking trails.',
    'countries': {
      'Anguilla': {},
      'Antigua And Barbuda': {},
      'Aruba': {},
      'Bahamas': {},
      'Barbados': {},
      'Bermuda': {},
      'Bonaire, Saint Eustatius and Saba': {},
      'British Virgin Islands': {},
      'Cayman Islands': {},
      'Cuba': {},
      'Curacao': {},
      'Dominica': {},
      'Dominican Republic': {},
      'Grenada': {},
      'Guadeloupe': {},
      'Haiti': {},
      'Jamaica': {},
      'Martinique': {},
      'Montserrat': {},
      'Puerto Rico': {},
      'Saint Barthélemy': {},
      'Saint Helena, Ascension And Tristan Da Cunha': {},
      'Saint Kitts And Nevis': {},
      'Saint Lucia': {},
      'Saint Martin': {},
      'Saint Vincent And The Grenadines': {},
      'Sint Maarten': {},
      'Trinidad And Tobago': {},
      'Turks And Caicos Islands': {},
      'U.S. Virgin Islands': {}
    }
  },
  'Central America': {
    'continent': 'Central America',
    'pageSubTitle': 'Lush Landscapes, Lively Cities, and Rich Culture.',
    'pageDescription': 'Central America is home to one of the richest areas of biodiversity in the world. Untouched rain forests and beaches in its seven countries make for the most incredible biology lesson of your life. It is a paradise where active volcanoes can be a stones-throw from some of the most breathtaking, remote beaches, and where coffee plantations are tucked away in the clouds. Sun yourself with a margarita in hand on the white sand beaches of Playa del Carmen, explore Mayan ruins in Tulum (you might want to head to the beach there, too!), enjoy a car-free paradise on Caye Caulker, or visit the remote fishing village of Santa Catalina whose natural beauty has gone relatively untouched.',
    'countries': {
      'Belize': {},
      'Costa Rica': {},
      'El Salvador': {},
      'Guatemala': {},
      'Honduras': {},
      'Nicaragua': {},
      'Panama': {}
    }
  },
  'Europe': {
    'continent': 'Europe',
    'pageSubTitle': 'An abundance of cultural treasures.',
    'pageDescription': 'Traveling across Europe opens your eyes to a world of unparalleled culture and history. It often seems impossible to choose between the Renaissance art of Florence and the Impressionist paintings of Paris; Germany’s Bavarian castles and the bustling multicultural London streets. The wealth of knowledge acquired in Europe is an asset of a lifetime – its only rivals being the  people and food you’ll encounter along the way! Close proximity of individual countries makes it easy to incorporate any number of them into your trip, while each country is more than worthy of a focused, extended stay as you immerse yourself in the culture and communities.',
    'countries': {
      'Åland Islands': {},
      'Albania': {},
      'Andorra': {},
      'Austria': {},
      'Belarus': {},
      'Belgium': {},
      'Bosnia And Herzegovina': {},
      'Bulgaria': {},
      'Croatia': {},
      'Cyprus': {},
      'Czech Republic': {},
      'Denmark': {},
      'Estonia': {},
      'Faroe Islands': {},
      'Finland': {},
      'France': {},
      'Germany': {},
      'Gibraltar': {},
      'Greece': {},
      'Guernsey': {},
      'Hungary': {},
      'Iceland': {},
      'Ireland': {},
      'Isle Of Man': {},
      'Italy': {},
      'Jersey': {},
      'Kosovo': {},
      'Latvia': {},
      'Lithuania': {},
      'Luxembourg': {},
      'Macedonia': {},
      'Malta': {},
      'Moldova': {},
      'Monaco': {},
      'Montenegro': {},
      'Netherlands': {},
      'Norway': {},
      'Poland': {},
      'Portugal': {},
      'Romania': {},
      'Russia': {},
      'San Marino': {},
      'Serbia': {},
      'Slovakia': {},
      'Slovenia': {},
      'Spain': {},
      'Svalbard And Jan Mayen': {},
      'Sweden': {},
      'Switzerland': {},
      'Turkey': {},
      'Ukraine': {},
      'United Kingdom': {},
      'Vatican City': {}
    }
  },
  'Middle East': {
    'continent': 'Middle East',
    'pageSubTitle': 'Get to know awe-inspiring lands where the past is always present.',
    'pageDescription': 'Getting to know the Middle East is discovering a land of beginnings. It is home to humankind’s first cities, and the birthplace of Christianity, Islam, and Judaism. Here, history is not merely in books but everywhere, from the pyramids of ancient Egypt to the lost city of Petra. On your path to discovering these ancient lands, you will find yourself surrounded by some of the most hospitable people you will ever meet whose community and generosity exceeds expectations.',
    'countries': {
      'Bahrain': {},
      'Cyprus': {},
      'Egypt': {},
      'Iran': {},
      'Israel': {},
      'Jordan': {},
      'Lebanon': {},
      'Oman': {},
      'Palestine': {},
      'Qatar': {},
      'Saudi Arabia': {},
      'Turkey': {},
      'United Arab Emirates': {}
    }
  },
  'North America': {
    'continent': 'North America',
    'pageSubTitle': 'The Possibilities Are Endless.',
    'pageDescription': 'Set to a backdrop of an impressive variety of landscapes, from lush tropical rainforests to the breath-taking Rocky Mountain range, North America offers a unique adventure for every traveler. Take a road trip along the Pacific Coast highway, zip-line through Canada’s temperate rainforests, or journey through Mexico’s Copper Canyon by train. The endless opportunities of the land will leave you wanting to discover more.',
    'countries': {
      'Canada': {},
      'Greenland': {},
      'Mexico': {},
      'Saint Pierre And Miquelon': {},
      'United States': {}
    }
  },
  'South America': {
    'continent': 'South America',
    'pageSubTitle': 'A Vibrant Array of Cultures.',
    'pageDescription': 'Experience the astounding variety of ancient and living cultures spread across a continent as geographically complex as its peoples. South America hosts some of the most colorful traditions, whether that be praying for the dead, celebrating life, or dancing through the night. Its rich history combines both pre-Colombian civilizations and the influences of Europe, Asia, and Africa. One visit might have you winding through the Andes visiting ancient ruins and colonial towns, while another may see you retreating to a rainforest lodge in the Amazon. Head to Rio de Janeiro to immerse yourself in the culture of one of Brazil’s most vibrant cities, or take things a little slower with a winetasting tour through Argentina and Chile.',
    'countries': {
      'Argentina': {},
      'Bolivia': {},
      'Brazil': {},
      'Chile': {},
      'Colombia': {},
      'Ecuador': {},
      'Falkland Islands (Malvinas)': {},
      'French Guiana': {},
      'Paraguay': {},
      'Peru': {},
      'South Georgia And The South Sandwich Islands': {},
      'Suriname': {},
      'Uruguay': {},
      'Venezuela': {}
    }
  },
  'South Pacific': {
    'continent': 'South Pacific',
    'pageSubTitle': 'Island Getaways for Every Traveler',
    'pageDescription': 'The islands that make up the South Pacific are dreamlike destinations, thanks to their pristine beaches and medley of mountains, reefs, deserts, and forests, with abundant wildlife. Ideal for adventure lovers, explore endless options from bungee jumping in New Zealand to world-class surfing in Australia. There’s an unforgettable experience calling your name around every corner.',
    'countries': {
      'Australia': {},
      'Christmas Island': {},
      'Cook Islands': {},
      'Fiji': {},
      'French Polynesia': {},
      'Guam': {},
      'Kiribati': {},
      'Marshall Islands': {},
      'Micronesia': {},
      'New Caledonia': {},
      'New Zealand': {},
      'Niue': {},
      'Norfolk Island': {},
      'Northern Mariana Islands': {},
      'Palau': {},
      'Papua New Guinea': {},
      'Pitcairn Islands': {},
      'Samoa': {},
      'Solomon Islands': {},
      'Tonga': {},
      'United States Minor Outlying Islands': {},
      'Vanuatu': {},
      'Wallis And Futuna': {}
    }
  }
}));

module.exports = router;
