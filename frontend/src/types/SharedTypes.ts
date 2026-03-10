// Developed by Mateo Pineda
export const COUNTRIES = [
  'AF',
  'AL',
  'DZ',
  'AD',
  'AO',
  'AG',
  'AR',
  'AM',
  'AU',
  'AT',
  'AZ',
  'BS',
  'BH',
  'BD',
  'BB',
  'BY',
  'BE',
  'BZ',
  'BJ',
  'BT',
  'BO',
  'BA',
  'BW',
  'BR',
  'BN',
  'BG',
  'BF',
  'BI',
  'CV',
  'KH',
  'CM',
  'CA',
  'CF',
  'TD',
  'CL',
  'CN',
  'CO',
  'KM',
  'CG',
  'CR',
  'HR',
  'CU',
  'CY',
  'CZ',
  'CD',
  'DK',
  'DJ',
  'DM',
  'DO',
  'EC',
  'EG',
  'SV',
  'GQ',
  'ER',
  'EE',
  'SZ',
  'ET',
  'FJ',
  'FI',
  'FR',
  'GA',
  'GM',
  'GE',
  'DE',
  'GH',
  'GR',
  'GD',
  'GT',
  'GN',
  'GW',
  'GY',
  'HT',
  'VA',
  'HN',
  'HU',
  'IS',
  'IN',
  'ID',
  'IR',
  'IQ',
  'IE',
  'IL',
  'IT',
  'JM',
  'JP',
  'JO',
  'KZ',
  'KE',
  'KI',
  'KW',
  'KG',
  'LA',
  'LV',
  'LB',
  'LS',
  'LR',
  'LY',
  'LI',
  'LT',
  'LU',
  'MG',
  'MW',
  'MY',
  'MV',
  'ML',
  'MT',
  'MH',
  'MR',
  'MU',
  'MX',
  'FM',
  'MD',
  'MC',
  'MN',
  'ME',
  'MA',
  'MZ',
  'MM',
  'NA',
  'NR',
  'NP',
  'NL',
  'NZ',
  'NI',
  'NE',
  'NG',
  'KP',
  'MK',
  'NO',
  'OM',
  'PK',
  'PW',
  'PS',
  'PA',
  'PG',
  'PY',
  'PE',
  'PH',
  'PL',
  'PT',
  'QA',
  'RO',
  'RU',
  'RW',
  'KN',
  'LC',
  'VC',
  'WS',
  'SM',
  'ST',
  'SA',
  'SN',
  'RS',
  'SC',
  'SL',
  'SG',
  'SK',
  'SI',
  'SB',
  'SO',
  'ZA',
  'KR',
  'SS',
  'ES',
  'LK',
  'SD',
  'SR',
  'SE',
  'CH',
  'SY',
  'TJ',
  'TZ',
  'TH',
  'TL',
  'TG',
  'TO',
  'TT',
  'TN',
  'TR',
  'TM',
  'TV',
  'UG',
  'UA',
  'AE',
  'GB',
  'US',
  'UY',
  'UZ',
  'VU',
  'VE',
  'VN',
  'YE',
  'ZM',
  'ZW',
] as const;

export type Country = (typeof COUNTRIES)[number];

export const COUNTRY_COORDINATES: Record<Country, { lat: number; lng: number }> = {
  AF: { lat: 34.5, lng: 69.2 }, // Afghanistan
  AL: { lat: 41.3, lng: 19.8 }, // Albania
  DZ: { lat: 36.7, lng: 3.1 }, // Algeria
  AD: { lat: 42.5, lng: 1.5 }, // Andorra
  AO: { lat: -8.8, lng: 13.2 }, // Angola
  AG: { lat: 17.1, lng: -61.8 }, // Antigua and Barbuda
  AR: { lat: -34.6, lng: -58.4 }, // Argentina
  AM: { lat: 40.2, lng: 44.5 }, // Armenia
  AU: { lat: -35.3, lng: 149.1 }, // Australia
  AT: { lat: 48.2, lng: 16.4 }, // Austria
  AZ: { lat: 40.4, lng: 49.9 }, // Azerbaijan
  BS: { lat: 25.1, lng: -77.3 }, // Bahamas
  BH: { lat: 26.2, lng: 50.6 }, // Bahrain
  BD: { lat: 23.7, lng: 90.4 }, // Bangladesh
  BB: { lat: 13.1, lng: -59.6 }, // Barbados
  BY: { lat: 53.9, lng: 27.6 }, // Belarus
  BE: { lat: 50.8, lng: 4.4 }, // Belgium
  BZ: { lat: 17.3, lng: -88.8 }, // Belize
  BJ: { lat: 6.4, lng: 2.4 }, // Benin
  BT: { lat: 27.5, lng: 89.6 }, // Bhutan
  BO: { lat: -16.5, lng: -68.1 }, // Bolivia
  BA: { lat: 43.8, lng: 18.4 }, // Bosnia and Herzegovina
  BW: { lat: -24.7, lng: 25.9 }, // Botswana
  BR: { lat: -15.8, lng: -47.9 }, // Brazil
  BN: { lat: 4.9, lng: 114.9 }, // Brunei
  BG: { lat: 42.7, lng: 23.3 }, // Bulgaria
  BF: { lat: 12.4, lng: -1.5 }, // Burkina Faso
  BI: { lat: -3.4, lng: 29.4 }, // Burundi
  CV: { lat: 14.9, lng: -23.5 }, // Cabo Verde
  KH: { lat: 11.6, lng: 104.9 }, // Cambodia
  CM: { lat: 3.9, lng: 11.5 }, // Cameroon
  CA: { lat: 45.4, lng: -75.7 }, // Canada
  CF: { lat: 4.4, lng: 18.6 }, // Central African Republic
  TD: { lat: 12.1, lng: 15.0 }, // Chad
  CL: { lat: -33.5, lng: -70.6 }, // Chile
  CN: { lat: 39.9, lng: 116.4 }, // China
  CO: { lat: 4.7, lng: -74.1 }, // Colombia
  KM: { lat: -11.7, lng: 43.3 }, // Comoros
  CG: { lat: -4.3, lng: 15.3 }, // Congo
  CR: { lat: 9.9, lng: -84.1 }, // Costa Rica
  HR: { lat: 45.8, lng: 16.0 }, // Croatia
  CU: { lat: 23.1, lng: -82.4 }, // Cuba
  CY: { lat: 35.2, lng: 33.4 }, // Cyprus
  CZ: { lat: 50.1, lng: 14.4 }, // Czech Republic
  CD: { lat: -4.3, lng: 15.3 }, // DR Congo
  DK: { lat: 55.7, lng: 12.6 }, // Denmark
  DJ: { lat: 11.6, lng: 43.1 }, // Djibouti
  DM: { lat: 15.3, lng: -61.4 }, // Dominica
  DO: { lat: 18.5, lng: -69.9 }, // Dominican Republic
  EC: { lat: -0.2, lng: -78.5 }, // Ecuador
  EG: { lat: 30.1, lng: 31.2 }, // Egypt
  SV: { lat: 13.7, lng: -89.2 }, // El Salvador
  GQ: { lat: 3.7, lng: 8.8 }, // Equatorial Guinea
  ER: { lat: 15.3, lng: 38.9 }, // Eritrea
  EE: { lat: 59.4, lng: 24.7 }, // Estonia
  SZ: { lat: -26.3, lng: 31.1 }, // Eswatini
  ET: { lat: 9.0, lng: 38.7 }, // Ethiopia
  FJ: { lat: -18.1, lng: 178.4 }, // Fiji
  FI: { lat: 60.2, lng: 25.0 }, // Finland
  FR: { lat: 48.9, lng: 2.3 }, // France
  GA: { lat: 0.4, lng: 9.5 }, // Gabon
  GM: { lat: 13.5, lng: -16.6 }, // Gambia
  GE: { lat: 41.7, lng: 44.8 }, // Georgia
  DE: { lat: 52.5, lng: 13.4 }, // Germany
  GH: { lat: 5.6, lng: -0.2 }, // Ghana
  GR: { lat: 38.0, lng: 23.7 }, // Greece
  GD: { lat: 12.1, lng: -61.7 }, // Grenada
  GT: { lat: 14.6, lng: -90.5 }, // Guatemala
  GN: { lat: 9.5, lng: -13.7 }, // Guinea
  GW: { lat: 11.9, lng: -15.6 }, // Guinea-Bissau
  GY: { lat: 6.8, lng: -58.2 }, // Guyana
  HT: { lat: 18.5, lng: -72.3 }, // Haiti
  VA: { lat: 41.9, lng: 12.5 }, // Holy See (Vatican)
  HN: { lat: 14.1, lng: -87.2 }, // Honduras
  HU: { lat: 47.5, lng: 19.0 }, // Hungary
  IS: { lat: 64.1, lng: -21.9 }, // Iceland
  IN: { lat: 28.6, lng: 77.2 }, // India
  ID: { lat: -6.2, lng: 106.8 }, // Indonesia
  IR: { lat: 35.7, lng: 51.4 }, // Iran
  IQ: { lat: 33.3, lng: 44.4 }, // Iraq
  IE: { lat: 53.3, lng: -6.3 }, // Ireland
  IL: { lat: 31.8, lng: 35.2 }, // Israel
  IT: { lat: 41.9, lng: 12.5 }, // Italy
  JM: { lat: 18.0, lng: -76.8 }, // Jamaica
  JP: { lat: 35.7, lng: 139.7 }, // Japan
  JO: { lat: 31.9, lng: 35.9 }, // Jordan
  KZ: { lat: 51.2, lng: 71.4 }, // Kazakhstan
  KE: { lat: -1.3, lng: 36.8 }, // Kenya
  KI: { lat: -0.9, lng: -169.5 }, // Kiribati
  KW: { lat: 29.4, lng: 47.9 }, // Kuwait
  KG: { lat: 42.9, lng: 74.6 }, // Kyrgyzstan
  LA: { lat: 18.0, lng: 102.6 }, // Laos
  LV: { lat: 56.9, lng: 24.1 }, // Latvia
  LB: { lat: 33.9, lng: 35.5 }, // Lebanon
  LS: { lat: -29.3, lng: 27.5 }, // Lesotho
  LR: { lat: 6.3, lng: -10.8 }, // Liberia
  LY: { lat: 32.9, lng: 13.2 }, // Libya
  LI: { lat: 47.1, lng: 9.5 }, // Liechtenstein
  LT: { lat: 54.7, lng: 25.3 }, // Lithuania
  LU: { lat: 49.6, lng: 6.1 }, // Luxembourg
  MG: { lat: -18.9, lng: 47.5 }, // Madagascar
  MW: { lat: -13.9, lng: 33.8 }, // Malawi
  MY: { lat: 3.1, lng: 101.7 }, // Malaysia
  MV: { lat: 4.2, lng: 73.5 }, // Maldives
  ML: { lat: 12.6, lng: -8.0 }, // Mali
  MT: { lat: 35.9, lng: 14.5 }, // Malta
  MH: { lat: 7.1, lng: 171.4 }, // Marshall Islands
  MR: { lat: 18.1, lng: -15.9 }, // Mauritania
  MU: { lat: -20.2, lng: 57.5 }, // Mauritius
  MX: { lat: 19.4, lng: -99.1 }, // Mexico
  FM: { lat: 6.9, lng: 158.2 }, // Micronesia
  MD: { lat: 47.0, lng: 28.9 }, // Moldova
  MC: { lat: 43.7, lng: 7.4 }, // Monaco
  MN: { lat: 47.9, lng: 106.9 }, // Mongolia
  ME: { lat: 42.4, lng: 19.3 }, // Montenegro
  MA: { lat: 34.0, lng: -6.8 }, // Morocco
  MZ: { lat: -25.9, lng: 32.6 }, // Mozambique
  MM: { lat: 16.8, lng: 96.2 }, // Myanmar
  NA: { lat: -22.6, lng: 17.1 }, // Namibia
  NR: { lat: -0.5, lng: 166.9 }, // Nauru
  NP: { lat: 27.7, lng: 85.3 }, // Nepal
  NL: { lat: 52.4, lng: 4.9 }, // Netherlands
  NZ: { lat: -41.3, lng: 174.8 }, // New Zealand
  NI: { lat: 12.1, lng: -86.3 }, // Nicaragua
  NE: { lat: 13.5, lng: 2.1 }, // Niger
  NG: { lat: 9.1, lng: 7.5 }, // Nigeria
  KP: { lat: 39.0, lng: 125.8 }, // North Korea
  MK: { lat: 42.0, lng: 21.4 }, // North Macedonia
  NO: { lat: 59.9, lng: 10.7 }, // Norway
  OM: { lat: 23.6, lng: 58.6 }, // Oman
  PK: { lat: 33.7, lng: 73.1 }, // Pakistan
  PW: { lat: 7.5, lng: 134.6 }, // Palau
  PS: { lat: 31.9, lng: 35.2 }, // Palestine
  PA: { lat: 9.0, lng: -79.5 }, // Panama
  PG: { lat: -9.4, lng: 147.2 }, // Papua New Guinea
  PY: { lat: -25.3, lng: -57.6 }, // Paraguay
  PE: { lat: -12.0, lng: -77.0 }, // Peru
  PH: { lat: 14.6, lng: 121.0 }, // Philippines
  PL: { lat: 52.2, lng: 21.0 }, // Poland
  PT: { lat: 38.7, lng: -9.1 }, // Portugal
  QA: { lat: 25.3, lng: 51.5 }, // Qatar
  RO: { lat: 44.4, lng: 26.1 }, // Romania
  RU: { lat: 55.8, lng: 37.6 }, // Russia
  RW: { lat: -1.9, lng: 30.1 }, // Rwanda
  KN: { lat: 17.3, lng: -62.7 }, // Saint Kitts and Nevis
  LC: { lat: 14.0, lng: -61.0 }, // Saint Lucia
  VC: { lat: 13.2, lng: -61.2 }, // Saint Vincent and the Grenadines
  WS: { lat: -13.8, lng: -172.1 }, // Samoa
  SM: { lat: 43.9, lng: 12.4 }, // San Marino
  ST: { lat: 0.3, lng: 6.7 }, // Sao Tome and Principe
  SA: { lat: 24.7, lng: 46.7 }, // Saudi Arabia
  SN: { lat: 14.7, lng: -17.4 }, // Senegal
  RS: { lat: 44.8, lng: 20.5 }, // Serbia
  SC: { lat: -4.6, lng: 55.5 }, // Seychelles
  SL: { lat: 8.5, lng: -13.2 }, // Sierra Leone
  SG: { lat: 1.3, lng: 103.8 }, // Singapore
  SK: { lat: 48.1, lng: 17.1 }, // Slovakia
  SI: { lat: 46.1, lng: 14.5 }, // Slovenia
  SB: { lat: -9.4, lng: 160.0 }, // Solomon Islands
  SO: { lat: 2.0, lng: 45.3 }, // Somalia
  ZA: { lat: -25.7, lng: 28.2 }, // South Africa
  KR: { lat: 37.6, lng: 127.0 }, // South Korea
  SS: { lat: 4.9, lng: 31.6 }, // South Sudan
  ES: { lat: 40.4, lng: -3.7 }, // Spain
  LK: { lat: 6.9, lng: 79.9 }, // Sri Lanka
  SD: { lat: 15.6, lng: 32.5 }, // Sudan
  SR: { lat: 5.8, lng: -55.2 }, // Suriname
  SE: { lat: 59.3, lng: 18.1 }, // Sweden
  CH: { lat: 46.9, lng: 7.4 }, // Switzerland
  SY: { lat: 33.5, lng: 36.3 }, // Syria
  TJ: { lat: 38.6, lng: 68.8 }, // Tajikistan
  TZ: { lat: -6.8, lng: 39.3 }, // Tanzania
  TH: { lat: 13.8, lng: 100.5 }, // Thailand
  TL: { lat: -8.6, lng: 125.6 }, // Timor-Leste
  TG: { lat: 6.1, lng: 1.2 }, // Togo
  TO: { lat: -21.1, lng: -175.2 }, // Tonga
  TT: { lat: 10.7, lng: -61.5 }, // Trinidad and Tobago
  TN: { lat: 36.8, lng: 10.2 }, // Tunisia
  TR: { lat: 39.9, lng: 32.9 }, // Turkey
  TM: { lat: 37.9, lng: 58.4 }, // Turkmenistan
  TV: { lat: -8.5, lng: 179.2 }, // Tuvalu
  UG: { lat: 0.3, lng: 32.6 }, // Uganda
  UA: { lat: 50.4, lng: 30.5 }, // Ukraine
  AE: { lat: 24.5, lng: 54.4 }, // United Arab Emirates
  GB: { lat: 51.5, lng: -0.1 }, // United Kingdom
  US: { lat: 38.9, lng: -77.0 }, // United States
  UY: { lat: -34.9, lng: -56.2 }, // Uruguay
  UZ: { lat: 41.3, lng: 69.3 }, // Uzbekistan
  VU: { lat: -17.7, lng: 168.3 }, // Vanuatu
  VE: { lat: 10.5, lng: -66.9 }, // Venezuela
  VN: { lat: 21.0, lng: 105.8 }, // Vietnam
  YE: { lat: 15.4, lng: 44.2 }, // Yemen
  ZM: { lat: -15.4, lng: 28.3 }, // Zambia
  ZW: { lat: -17.8, lng: 31.0 }, // Zimbabwe
};
