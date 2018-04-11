// Array of country objects for the flag dropdown.

// Here is the criteria for the plugin to support a given country/territory
// - It has an iso2 code: https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2
// - It has it's own country calling code (it is not a sub-region of
// another country): https://en.wikipedia.org/wiki/List_of_country_calling_codes
// - It has a flag in the region-flags project: https://github.com/behdad/region-flags/tree/gh-pages/png
// - It is supported by libphonenumber (it must be listed on this page):
// https://github.com/googlei18n/libphonenumber/blob/master/resources/ShortNumberMetadata.xml

// Each country array has the following information:
// [
//    Country name,
//    iso2 code,
//    International dial code,
//    Order (if >1 country with same dial code),
//    Area codes
// ]

import { environment } from '../../environments/environment.prod';

export const ALL_COUNTRIES = [
  [
    'Afghanistan (‫افغانستان‬‎)',
    'af',
    '93'
  ],
  [
    'Albania (Shqipëri)',
    'al',
    '355'
  ],
  [
    'Algeria (‫الجزائر‬‎)',
    'dz',
    '213'
  ],
  [
    'American Samoa',
    'as',
    '1684'
  ],
  [
    'Andorra',
    'ad',
    '376'
  ],
  [
    'Angola',
    'ao',
    '244'
  ],
  [
    'Anguilla',
    'ai',
    '1264'
  ],
  [
    'Antigua and Barbuda',
    'ag',
    '1268'
  ],
  [
    'Argentina',
    'ar',
    '54'
  ],
  [
    'Armenia (Հայաստան)',
    'am',
    '374'
  ],
  [
    'Aruba',
    'aw',
    '297'
  ],
  [
    'Australia',
    'au',
    '61',
    0
  ],
  [
    'Austria (Österreich)',
    'at',
    '43'
  ],
  [
    'Azerbaijan (Azərbaycan)',
    'az',
    '994'
  ],
  [
    'Bahamas',
    'bs',
    '1242'
  ],
  [
    'Bahrain (‫البحرين‬‎)',
    'bh',
    '973'
  ],
  [
    'Bangladesh (বাংলাদেশ)',
    'bd',
    '880'
  ],
  [
    'Barbados',
    'bb',
    '1246'
  ],
  [
    'Belarus (Беларусь)',
    'by',
    '375'
  ],
  [
    'Belgium (België)',
    'be',
    '32'
  ],
  [
    'Belize',
    'bz',
    '501'
  ],
  [
    'Benin (Bénin)',
    'bj',
    '229'
  ],
  [
    'Bermuda',
    'bm',
    '1441'
  ],
  [
    'Bhutan (འབྲུག)',
    'bt',
    '975'
  ],
  [
    'Bolivia',
    'bo',
    '591'
  ],
  [
    'Bosnia and Herzegovina (Босна и Херцеговина)',
    'ba',
    '387'
  ],
  [
    'Botswana',
    'bw',
    '267'
  ],
  [
    'Brazil (Brasil)',
    'br',
    '55'
  ],
  [
    'British Indian Ocean Territory',
    'io',
    '246'
  ],
  [
    'British Virgin Islands',
    'vg',
    '1284'
  ],
  [
    'Brunei',
    'bn',
    '673'
  ],
  [
    'Bulgaria (България)',
    'bg',
    '359'
  ],
  [
    'Burkina Faso',
    'bf',
    '226'
  ],
  [
    'Burundi (Uburundi)',
    'bi',
    '257'
  ],
  [
    'Cambodia (កម្ពុជា)',
    'kh',
    '855'
  ],
  [
    'Cameroon (Cameroun)',
    'cm',
    '237'
  ],
  [
    'Canada',
    'ca',
    '1',
    1,
    [
      '204', '226', '236', '249', '250', '289', '306', '343', '365', '387', '403', '416', '418', '431', '437',
      '438', '450', '506', '514', '519', '548', '579', '581', '587', '604', '613', '639', '647', '672', '705',
      '709', '742', '778', '780', '782', '807', '819', '825', '867', '873', '902', '905'
    ]
  ],
  [
    'Cape Verde (Kabu Verdi)',
    'cv',
    '238'
  ],
  [
    'Caribbean Netherlands',
    'bq',
    '599',
    1
  ],
  [
    'Cayman Islands',
    'ky',
    '1345'
  ],
  [
    'Central African Republic (République centrafricaine)',
    'cf',
    '236'
  ],
  [
    'Chad (Tchad)',
    'td',
    '235'
  ],
  [
    'Chile',
    'cl',
    '56'
  ],
  [
    'China (中国)',
    'cn',
    '86'
  ],
  [
    'Christmas Island',
    'cx',
    '61',
    2
  ],
  [
    'Cocos (Keeling) Islands',
    'cc',
    '61',
    1
  ],
  [
    'Colombia',
    'co',
    '57'
  ],
  [
    'Comoros (‫جزر القمر‬‎)',
    'km',
    '269'
  ],
  [
    'Congo (DRC) (Jamhuri ya Kidemokrasia ya Kongo)',
    'cd',
    '243'
  ],
  [
    'Congo (Republic) (Congo-Brazzaville)',
    'cg',
    '242'
  ],
  [
    'Cook Islands',
    'ck',
    '682'
  ],
  [
    'Costa Rica',
    'cr',
    '506'
  ],
  [
    'Côte d’Ivoire',
    'ci',
    '225'
  ],
  [
    'Croatia (Hrvatska)',
    'hr',
    '385'
  ],
  [
    'Cuba',
    'cu',
    '53'
  ],
  [
    'Curaçao',
    'cw',
    '599',
    0
  ],
  [
    'Cyprus (Κύπρος)',
    'cy',
    '357'
  ],
  [
    'Czech Republic (Česká republika)',
    'cz',
    '420'
  ],
  [
    'Denmark (Danmark)',
    'dk',
    '45'
  ],
  [
    'Djibouti',
    'dj',
    '253'
  ],
  [
    'Dominica',
    'dm',
    '1767'
  ],
  [
    'Dominican Republic (República Dominicana)',
    'do',
    '1',
    2,
    ['809', '829', '849']
  ],
  [
    'Ecuador',
    'ec',
    '593'
  ],
  [
    'Egypt (‫مصر‬‎)',
    'eg',
    '20'
  ],
  [
    'El Salvador',
    'sv',
    '503'
  ],
  [
    'Equatorial Guinea (Guinea Ecuatorial)',
    'gq',
    '240'
  ],
  [
    'Eritrea',
    'er',
    '291'
  ],
  [
    'Estonia (Eesti)',
    'ee',
    '372'
  ],
  [
    'Ethiopia',
    'et',
    '251'
  ],
  [
    'Falkland Islands (Islas Malvinas)',
    'fk',
    '500'
  ],
  [
    'Faroe Islands (Føroyar)',
    'fo',
    '298'
  ],
  [
    'Fiji',
    'fj',
    '679'
  ],
  [
    'Finland (Suomi)',
    'fi',
    '358',
    0
  ],
  [
    'France',
    'fr',
    '33'
  ],
  [
    'French Guiana (Guyane française)',
    'gf',
    '594'
  ],
  [
    'French Polynesia (Polynésie française)',
    'pf',
    '689'
  ],
  [
    'Gabon',
    'ga',
    '241'
  ],
  [
    'Gambia',
    'gm',
    '220'
  ],
  [
    'Georgia (საქართველო)',
    'ge',
    '995'
  ],
  [
    'Germany (Deutschland)',
    'de',
    '49'
  ],
  [
    'Ghana (Gaana)',
    'gh',
    '233'
  ],
  [
    'Gibraltar',
    'gi',
    '350'
  ],
  [
    'Greece (Ελλάδα)',
    'gr',
    '30'
  ],
  [
    'Greenland (Kalaallit Nunaat)',
    'gl',
    '299'
  ],
  [
    'Grenada',
    'gd',
    '1473'
  ],
  [
    'Guadeloupe',
    'gp',
    '590',
    0
  ],
  [
    'Guam',
    'gu',
    '1671'
  ],
  [
    'Guatemala',
    'gt',
    '502'
  ],
  [
    'Guernsey',
    'gg',
    '44',
    1
  ],
  [
    'Guinea (Guinée)',
    'gn',
    '224'
  ],
  [
    'Guinea-Bissau (Guiné Bissau)',
    'gw',
    '245'
  ],
  [
    'Guyana',
    'gy',
    '592'
  ],
  [
    'Haiti',
    'ht',
    '509'
  ],
  [
    'Honduras',
    'hn',
    '504'
  ],
  [
    'Hong Kong (香港)',
    'hk',
    '852'
  ],
  [
    'Hungary (Magyarország)',
    'hu',
    '36'
  ],
  [
    'Iceland (Ísland)',
    'is',
    '354'
  ],
  [
    'India (भारत)',
    'in',
    '91'
  ],
  [
    'Indonesia',
    'id',
    '62'
  ],
  [
    'Iran (‫ایران‬‎)',
    'ir',
    '98'
  ],
  [
    'Iraq (‫العراق‬‎)',
    'iq',
    '964'
  ],
  [
    'Ireland',
    'ie',
    '353'
  ],
  [
    'Isle of Man',
    'im',
    '44',
    2
  ],
  [
    'Israel (‫ישראל‬‎)',
    'il',
    '972'
  ],
  [
    'Italy (Italia)',
    'it',
    '39',
    0
  ],
  [
    'Jamaica',
    'jm',
    '1876'
  ],
  [
    'Japan (日本)',
    'jp',
    '81'
  ],
  [
    'Jersey',
    'je',
    '44',
    3
  ],
  [
    'Jordan (‫الأردن‬‎)',
    'jo',
    '962'
  ],
  [
    'Kazakhstan (Казахстан)',
    'kz',
    '7',
    1
  ],
  [
    'Kenya',
    'ke',
    '254'
  ],
  [
    'Kiribati',
    'ki',
    '686'
  ],
  [
    'Kosovo',
    'xk',
    '383'
  ],
  [
    'Kuwait (‫الكويت‬‎)',
    'kw',
    '965'
  ],
  [
    'Kyrgyzstan (Кыргызстан)',
    'kg',
    '996'
  ],
  [
    'Laos (ລາວ)',
    'la',
    '856'
  ],
  [
    'Latvia (Latvija)',
    'lv',
    '371'
  ],
  [
    'Lebanon (‫لبنان‬‎)',
    'lb',
    '961'
  ],
  [
    'Lesotho',
    'ls',
    '266'
  ],
  [
    'Liberia',
    'lr',
    '231'
  ],
  [
    'Libya (‫ليبيا‬‎)',
    'ly',
    '218'
  ],
  [
    'Liechtenstein',
    'li',
    '423'
  ],
  [
    'Lithuania (Lietuva)',
    'lt',
    '370'
  ],
  [
    'Luxembourg',
    'lu',
    '352'
  ],
  [
    'Macau (澳門)',
    'mo',
    '853'
  ],
  [
    'Macedonia (FYROM) (Македонија)',
    'mk',
    '389'
  ],
  [
    'Madagascar (Madagasikara)',
    'mg',
    '261'
  ],
  [
    'Malawi',
    'mw',
    '265'
  ],
  [
    'Malaysia',
    'my',
    '60'
  ],
  [
    'Maldives',
    'mv',
    '960'
  ],
  [
    'Mali',
    'ml',
    '223'
  ],
  [
    'Malta',
    'mt',
    '356'
  ],
  [
    'Marshall Islands',
    'mh',
    '692'
  ],
  [
    'Martinique',
    'mq',
    '596'
  ],
  [
    'Mauritania (‫موريتانيا‬‎)',
    'mr',
    '222'
  ],
  [
    'Mauritius (Moris)',
    'mu',
    '230'
  ],
  [
    'Mayotte',
    'yt',
    '262',
    1
  ],
  [
    'Mexico (México)',
    'mx',
    '52'
  ],
  [
    'Micronesia',
    'fm',
    '691'
  ],
  [
    'Moldova (Republica Moldova)',
    'md',
    '373'
  ],
  [
    'Monaco',
    'mc',
    '377'
  ],
  [
    'Mongolia (Монгол)',
    'mn',
    '976'
  ],
  [
    'Montenegro (Crna Gora)',
    'me',
    '382'
  ],
  [
    'Montserrat',
    'ms',
    '1664'
  ],
  [
    'Morocco (‫المغرب‬‎)',
    'ma',
    '212',
    0
  ],
  [
    'Mozambique (Moçambique)',
    'mz',
    '258'
  ],
  [
    'Myanmar (Burma) (မြန်မာ)',
    'mm',
    '95'
  ],
  [
    'Namibia (Namibië)',
    'na',
    '264'
  ],
  [
    'Nauru',
    'nr',
    '674'
  ],
  [
    'Nepal (नेपाल)',
    'np',
    '977'
  ],
  [
    'Netherlands (Nederland)',
    'nl',
    '31'
  ],
  [
    'New Caledonia (Nouvelle-Calédonie)',
    'nc',
    '687'
  ],
  [
    'New Zealand',
    'nz',
    '64'
  ],
  [
    'Nicaragua',
    'ni',
    '505'
  ],
  [
    'Niger (Nijar)',
    'ne',
    '227'
  ],
  [
    'Nigeria',
    'ng',
    '234'
  ],
  [
    'Niue',
    'nu',
    '683'
  ],
  [
    'Norfolk Island',
    'nf',
    '672'
  ],
  [
    'North Korea (조선 민주주의 인민 공화국)',
    'kp',
    '850'
  ],
  [
    'Northern Mariana Islands',
    'mp',
    '1670'
  ],
  [
    'Norway (Norge)',
    'no',
    '47',
    0
  ],
  [
    'Oman (‫عُمان‬‎)',
    'om',
    '968'
  ],
  [
    'Pakistan (‫پاکستان‬‎)',
    'pk',
    '92'
  ],
  [
    'Palau',
    'pw',
    '680'
  ],
  [
    'Palestine (‫فلسطين‬‎)',
    'ps',
    '970'
  ],
  [
    'Panama (Panamá)',
    'pa',
    '507'
  ],
  [
    'Papua New Guinea',
    'pg',
    '675'
  ],
  [
    'Paraguay',
    'py',
    '595'
  ],
  [
    'Peru (Perú)',
    'pe',
    '51'
  ],
  [
    'Philippines',
    'ph',
    '63'
  ],
  [
    'Poland (Polska)',
    'pl',
    '48'
  ],
  [
    'Portugal',
    'pt',
    '351'
  ],
  [
    'Puerto Rico',
    'pr',
    '1',
    3,
    ['787', '939']
  ],
  [
    'Qatar (‫قطر‬‎)',
    'qa',
    '974'
  ],
  [
    'Réunion (La Réunion)',
    're',
    '262',
    0
  ],
  [
    'Romania (România)',
    'ro',
    '40'
  ],
  [
    'Russia (Россия)',
    'ru',
    '7',
    0
  ],
  [
    'Rwanda',
    'rw',
    '250'
  ],
  [
    'Saint Barthélemy',
    'bl',
    '590',
    1
  ],
  [
    'Saint Helena',
    'sh',
    '290'
  ],
  [
    'Saint Kitts and Nevis',
    'kn',
    '1869'
  ],
  [
    'Saint Lucia',
    'lc',
    '1758'
  ],
  [
    'Saint Martin (Saint-Martin (partie française))',
    'mf',
    '590',
    2
  ],
  [
    'Saint Pierre and Miquelon (Saint-Pierre-et-Miquelon)',
    'pm',
    '508'
  ],
  [
    'Saint Vincent and the Grenadines',
    'vc',
    '1784'
  ],
  [
    'Samoa',
    'ws',
    '685'
  ],
  [
    'San Marino',
    'sm',
    '378'
  ],
  [
    'São Tomé and Príncipe (São Tomé e Príncipe)',
    'st',
    '239'
  ],
  [
    'Saudi Arabia (‫المملكة العربية السعودية‬‎)',
    'sa',
    '966'
  ],
  [
    'Senegal (Sénégal)',
    'sn',
    '221'
  ],
  [
    'Serbia (Србија)',
    'rs',
    '381'
  ],
  [
    'Seychelles',
    'sc',
    '248'
  ],
  [
    'Sierra Leone',
    'sl',
    '232'
  ],
  [
    'Singapore',
    'sg',
    '65'
  ],
  [
    'Sint Maarten',
    'sx',
    '1721'
  ],
  [
    'Slovakia (Slovensko)',
    'sk',
    '421'
  ],
  [
    'Slovenia (Slovenija)',
    'si',
    '386'
  ],
  [
    'Solomon Islands',
    'sb',
    '677'
  ],
  [
    'Somalia (Soomaaliya)',
    'so',
    '252'
  ],
  [
    'South Africa',
    'za',
    '27'
  ],
  [
    'South Korea (대한민국)',
    'kr',
    '82'
  ],
  [
    'South Sudan (‫جنوب السودان‬‎)',
    'ss',
    '211'
  ],
  [
    'Spain (España)',
    'es',
    '34'
  ],
  [
    'Sri Lanka (ශ්‍රී ලංකාව)',
    'lk',
    '94'
  ],
  [
    'Sudan (‫السودان‬‎)',
    'sd',
    '249'
  ],
  [
    'Suriname',
    'sr',
    '597'
  ],
  [
    'Svalbard and Jan Mayen',
    'sj',
    '47',
    1
  ],
  [
    'Swaziland',
    'sz',
    '268'
  ],
  [
    'Sweden (Sverige)',
    'se',
    '46'
  ],
  [
    'Switzerland (Schweiz)',
    'ch',
    '41'
  ],
  [
    'Syria (‫سوريا‬‎)',
    'sy',
    '963'
  ],
  [
    'Taiwan (台灣)',
    'tw',
    '886'
  ],
  [
    'Tajikistan',
    'tj',
    '992'
  ],
  [
    'Tanzania',
    'tz',
    '255'
  ],
  [
    'Thailand (ไทย)',
    'th',
    '66'
  ],
  [
    'Timor-Leste',
    'tl',
    '670'
  ],
  [
    'Togo',
    'tg',
    '228'
  ],
  [
    'Tokelau',
    'tk',
    '690'
  ],
  [
    'Tonga',
    'to',
    '676'
  ],
  [
    'Trinidad and Tobago',
    'tt',
    '1868'
  ],
  [
    'Tunisia (‫تونس‬‎)',
    'tn',
    '216'
  ],
  [
    'Turkey (Türkiye)',
    'tr',
    '90'
  ],
  [
    'Turkmenistan',
    'tm',
    '993'
  ],
  [
    'Turks and Caicos Islands',
    'tc',
    '1649'
  ],
  [
    'Tuvalu',
    'tv',
    '688'
  ],
  [
    'U.S. Virgin Islands',
    'vi',
    '1340'
  ],
  [
    'Uganda',
    'ug',
    '256'
  ],
  [
    'Ukraine (Україна)',
    'ua',
    '380'
  ],
  [
    'United Arab Emirates (‫الإمارات العربية المتحدة‬‎)',
    'ae',
    '971'
  ],
  [
    'United Kingdom',
    'gb',
    '44',
    0
  ],
  [
    'United States',
    'us',
    '1',
    0
  ],
  [
    'Uruguay',
    'uy',
    '598'
  ],
  [
    'Uzbekistan (Oʻzbekiston)',
    'uz',
    '998'
  ],
  [
    'Vanuatu',
    'vu',
    '678'
  ],
  [
    'Vatican City (Città del Vaticano)',
    'va',
    '39',
    1
  ],
  [
    'Venezuela',
    've',
    '58'
  ],
  [
    'Vietnam (Việt Nam)',
    'vn',
    '84'
  ],
  [
    'Wallis and Futuna (Wallis-et-Futuna)',
    'wf',
    '681'
  ],
  [
    'Western Sahara (‫الصحراء الغربية‬‎)',
    'eh',
    '212',
    1
  ],
  [
    'Yemen (‫اليمن‬‎)',
    'ye',
    '967'
  ],
  [
    'Zambia',
    'zm',
    '260'
  ],
  [
    'Zimbabwe',
    'zw',
    '263'
  ],
  [
    'Åland Islands',
    'ax',
    '358',
    1
  ]
];

// https://en.wikipedia.org/wiki/List_of_North_American_Numbering_Plan_area_codes#Non-geographic_area_codes
export const regionlessNanpNumbers = [
  '800', '822', '833', '844', '855', '866', '877', '880', '881', '882', '883', '884', '885', '886', '887', '888', '889'
];

export const options = {
  allowDropdown: true,
  autoHideDialCode: true,
  autoPlaceholder: 'polite',
  customPlaceholder: null,
  dropdownContainer: '',
  excludeCountries: [],
  formatOnDisplay: true,
  geoIpLookup: null,
  geoIpJsonpUrl: environment.ipInfoUrl,
  hiddenInput: '',
  initialCountry: 'auto',
  nationalMode: true,
  onlyCountries: [],
  placeholderNumberType: 'MOBILE',
  preferredCountries: ['de', 'at', 'ch'],
  separateDialCode: false,
  utilsScript: true
};

export const examples = {
  'AC': '40123', 'AD': '312345', 'AE': '501234567', 'AF': '701234567', 'AG': '2684641234', 'AI': '2642351234',
  'AL': '662123456', 'AM': '77123456', 'AO': '923123456', 'AR': '91123456789', 'AS': '6847331234', 'AT': '664123456',
  'AU': '412345678', 'AW': '5601234', 'AX': '412345678', 'AZ': '401234567', 'BA': '61123456', 'BB': '2462501234',
  'BD': '1812345678', 'BE': '470123456', 'BF': '70123456', 'BG': '48123456', 'BH': '36001234', 'BI': '79561234',
  'BJ': '90011234', 'BL': '690001234', 'BM': '4413701234', 'BN': '7123456', 'BO': '71234567', 'BQ': '3181234',
  'BR': '11961234567', 'BS': '2423591234', 'BT': '17123456', 'BW': '71123456', 'BY': '294911911', 'BZ': '6221234',
  'CA': '2042345678', 'CC': '412345678', 'CD': '991234567', 'CF': '70012345', 'CG': '061234567', 'CH': '781234567', 'CI': '01234567',
  'CK': '71234', 'CL': '961234567', 'CM': '671234567', 'CN': '13123456789', 'CO': '3211234567', 'CR': '83123456', 'CU': '51234567',
  'CV': '9911234', 'CW': '95181234', 'CX': '412345678', 'CY': '96123456', 'CZ': '601123456', 'DE': '15123456789', 'DJ': '77831001',
  'DK': '20123456', 'DM': '7672251234', 'DO': '8092345678', 'DZ': '551234567', 'EC': '991234567', 'EE': '51234567', 'EG': '1001234567',
  'EH': '650123456', 'ER': '7123456', 'ES': '612345678', 'ET': '911234567', 'FI': '412345678', 'FJ': '7012345', 'FK': '51234',
  'FM': '3501234', 'FO': '211234', 'FR': '612345678', 'GA': '06031234', 'GB': '7400123456', 'GD': '4734031234', 'GE': '555123456',
  'GF': '694201234', 'GG': '7781123456', 'GH': '231234567', 'GI': '57123456', 'GL': '221234', 'GM': '3012345', 'GN': '601123456',
  'GP': '690001234', 'GQ': '222123456', 'GR': '6912345678', 'GT': '51234567', 'GU': '6713001234', 'GW': '955012345', 'GY': '6091234',
  'HK': '51234567', 'HN': '91234567', 'HR': '921234567', 'HT': '34101234', 'HU': '201234567', 'ID': '812345678', 'IE': '850123456',
  'IL': '501234567', 'IM': '7924123456', 'IN': '8123456789', 'IO': '3801234', 'IQ': '7912345678', 'IR': '9123456789', 'IS': '6111234',
  'IT': '3123456789', 'JE': '7797712345', 'JM': '8762101234', 'JO': '790123456', 'JP': '9012345678', 'KE': '712123456', 'KG': '700123456',
  'KH': '91234567', 'KI': '72001234', 'KM': '3212345', 'KN': '8697652917', 'KP': '1921234567', 'KR': '1000000000', 'KW': '50012345',
  'KY': '3453231234', 'KZ': '7710009998', 'LA': '2023123456', 'LB': '71123456', 'LC': '7582845678', 'LI': '660234567', 'LK': '712345678',
  'LR': '770123456', 'LS': '50123456', 'LT': '61234567', 'LU': '628123456', 'LV': '21234567', 'LY': '912345678', 'MA': '650123456',
  'MC': '612345678', 'MD': '62112345', 'ME': '67622901', 'MF': '690001234', 'MG': '321234567', 'MH': '2351234', 'MK': '72345678',
  'ML': '65012345', 'MM': '92123456', 'MN': '88123456', 'MO': '66123456', 'MP': '6702345678', 'MQ': '696201234', 'MR': '22123456',
  'MS': '6644923456', 'MT': '96961234', 'MU': '52512345', 'MV': '7712345', 'MW': '991234567', 'MX': '12221234567', 'MY': '123456789',
  'MZ': '821234567', 'NA': '811234567', 'NC': '751234', 'NE': '93123456', 'NF': '381234', 'NG': '8021234567', 'NI': '81234567',
  'NL': '612345678', 'NO': '40612345', 'NP': '9841234567', 'NR': '5551234', 'NU': '1234', 'NZ': '211234567', 'OM': '92123456',
  'PA': '61234567', 'PE': '912345678', 'PF': '87123456', 'PG': '70123456', 'PH': '9051234567', 'PK': '3012345678', 'PL': '512345678',
  'PM': '551234', 'PR': '7872345678', 'PS': '599123456', 'PT': '912345678', 'PW': '6201234', 'PY': '961456789', 'QA': '33123456',
  'RE': '692123456', 'RO': '712034567', 'RS': '601234567', 'RU': '9123456789', 'RW': '720123456', 'SA': '512345678', 'SB': '7421234',
  'SC': '2510123', 'SD': '911231234', 'SE': '701234567', 'SG': '81234567', 'SH': '51234', 'SI': '31234567', 'SJ': '41234567',
  'SK': '912123456', 'SL': '25123456', 'SM': '66661212', 'SN': '701234567', 'SO': '71123456', 'SR': '7412345', 'SS': '977123456',
  'ST': '9812345', 'SV': '70123456', 'SX': '7215205678', 'SY': '944567890', 'SZ': '76123456', 'TA': '8999', 'TC': '6492311234',
  'TD': '63012345', 'TG': '90112345', 'TH': '812345678', 'TJ': '917123456', 'TK': '7290', 'TL': '77212345', 'TM': '66123456',
  'TN': '20123456', 'TO': '7715123', 'TR': '5012345678', 'TT': '8682911234', 'TV': '901234', 'TW': '912345678', 'TZ': '621234567',
  'UA': '391234567', 'UG': '712345678', 'US': '2015550123', 'UY': '94231234', 'UZ': '912345678', 'VA': '3123456789', 'VC': '7844301234',
  'VE': '4121234567', 'VG': '2843001234', 'VI': '3406421234', 'VN': '912345678', 'VU': '5912345', 'WF': '501234', 'WS': '601234',
  'YE': '712345678', 'YT': '639012345', 'ZA': '711234567', 'ZM': '955123456', 'ZW': '712345678'
};

// copied this from i18n.phonenumbers.PhoneNumberType in
// https://github.com/googlei18n/libphonenumber/blob/master/javascript/i18n/phonenumbers/phonenumberutil.js
// and put the keys in quotes to force closure compiler to preserve the keys
// TODO: there must be a way to just tell closure compiler to preserve the keys on i18n.phonenumbers.PhoneNumberType and just export that
export const numberTypes = {
  'FIXED_LINE': 0,
  'MOBILE': 1,
  // In some regions (e.g. the USA), it is impossible to distinguish between
  // fixed-line and mobile numbers by looking at the phone number itself.
  'FIXED_LINE_OR_MOBILE': 2,
  // Freephone lines
  'TOLL_FREE': 3,
  'PREMIUM_RATE': 4,
  // The cost of this call is shared between the caller and the recipient, and
  // is hence typically less than PREMIUM_RATE calls. See
  // http://en.wikipedia.org/wiki/Shared_Cost_Service for more information.
  'SHARED_COST': 5,
  // Voice over IP numbers. This includes TSoIP (Telephony Service over IP).
  'VOIP': 6,
  // A personal number is associated with a particular person, and may be routed
  // to either a MOBILE or FIXED_LINE number. Some more information can be found
  // here: http://en.wikipedia.org/wiki/Personal_Numbers
  'PERSONAL_NUMBER': 7,
  'PAGER': 8,
  // Used for 'Universal Access Numbers' or 'Company Numbers'. They may be
  // further routed to specific offices, but allow one number to be used for a
  // company.
  'UAN': 9,
  // Used for 'Voice Mail Access Numbers'.
  'VOICEMAIL': 10,
  // A phone number is of type UNKNOWN when it does not fit any of the known
  // patterns for a specific region.
  'UNKNOWN': -1
};


// copied this from i18n.phonenumbers.PhoneNumberUtil.ValidationResult in
// https://github.com/googlei18n/libphonenumber/blob/master/javascript/i18n/phonenumbers/phonenumberutil.js
// and again put the keys in quotes.
// Also: added NOT_A_NUMBER to match i18n.phonenumbers.Error.NOT_A_NUMBER
export const validationError = {
  'IS_POSSIBLE': 0,
  'INVALID_COUNTRY_CODE': 1,
  'TOO_SHORT': 2,
  'TOO_LONG': 3,
  'NOT_A_NUMBER': 4
};
