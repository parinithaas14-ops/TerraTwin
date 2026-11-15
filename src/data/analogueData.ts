import heroPlanetaryImg from '../assets/images/hero_planetary_analogue_1794721869851.jpg';
import moonSouthPoleImg from '../assets/images/moon_south_pole_1794721869644.jpg';
import marsJezeroImg from '../assets/images/mars_jezero_crater_1794721870849.jpg';
import earthAtacamaImg from '../assets/images/earth_atacama_analogue_1794721871573.jpg';
import earthDevonImg from '../assets/images/earth_devon_arctic_1794721871479.jpg';

export type NavSection =
  | 'home'
  | 'moon'
  | 'mars'
  | 'earth'
  | 'compare'
  | 'about';

export type WorldType = 'moon' | 'mars';

export type EarthTerrainCategory =
  | 'Polar & Impact'
  | 'Hyper-Arid Desert'
  | 'Volcanic & Basalt';

export interface ScienceProfile {
  /** All scores 0-100 are Sample Demonstration Data for educational illustration */
  geomorphology: number;
  mineralogy: number;
  thermalAridity: number;
  solarPowerAnalogue: number;
  operationsLogistics: number;
}

export interface ExtraterrestrialSite {
  id: string;
  world: WorldType;
  name: string;
  region: string;
  coordinates: string;
  primaryFeature: string;
  missionContext: string;
  keyConditions: string[];
  scientificInterest: string;
  recommendedEarthIds: string[];
  imageUrl?: string;
  imageAlt: string;
  /** Clearly labeled Sample Demonstration Data for illustrative comparison */
  demoTargetProfile: ScienceProfile;
}

export interface EarthAnalogueSite {
  id: string;
  name: string;
  countryOrRegion: string;
  coordinates: string;
  elevation: string;
  category: EarthTerrainCategory;
  targetWorlds: WorldType[];
  summary: string;
  geologicalMatch: string;
  fieldResearchUse: string;
  climateNotes: string;
  imageUrl?: string;
  imageAlt: string;
  /** Clearly labeled Sample Demonstration Data for illustrative comparison */
  demoProfile: ScienceProfile;
}

export const HERO_VISUAL = {
  imageUrl: heroPlanetaryImg,
  imageAlt: 'Orbital view of Earth, the Moon, and Mars aligned in deep space',
};

export const MOON_SITES: ExtraterrestrialSite[] = [
  {
    id: 'moon-shackleton',
    world: 'moon',
    name: 'Shackleton Crater Rim',
    region: 'Lunar South Pole',
    coordinates: '89.54° S, 129.78° E',
    primaryFeature: 'Sunlit rim adjacent to permanently shadowed floor',
    missionContext:
      'Candidate zone for Artemis lunar south pole exploration and long-duration surface operations.',
    keyConditions: [
      'Near-continuous solar grazing illumination along elevated ridge crests',
      'Cryogenic permanently shadowed crater interior capable of trapping water ice',
      'Anorthositic highland regolith mixed with impact breccia',
    ],
    scientificInterest:
      'Access to both persistent solar energy on the rim and volatile cold traps in the crater floor makes this a focal region for permanent base studies.',
    recommendedEarthIds: ['earth-devon', 'earth-mcmurdo'],
    imageUrl: moonSouthPoleImg,
    imageAlt: 'Sunlit rim and shadowed interior of Shackleton Crater near the lunar south pole',
    demoTargetProfile: {
      geomorphology: 90,
      mineralogy: 76,
      thermalAridity: 96,
      solarPowerAnalogue: 88,
      operationsLogistics: 72,
    },
  },
  {
    id: 'moon-malapert',
    world: 'moon',
    name: 'Malapert Massif',
    region: 'Lunar South Pole Highlands',
    coordinates: '86.00° S, 12.90° E',
    primaryFeature: 'High-elevation massif with line-of-sight to Earth',
    missionContext:
      'Studied as a communications relay and surface habitat plateau near polar cold traps.',
    keyConditions: [
      'Elevated topography rising several kilometers above surrounding terrain',
      'High-angle rocky slopes requiring rover mobility testing',
      'Direct line-of-sight to Earth for continuous telemetry relays',
    ],
    scientificInterest:
      'Ideal for testing long-range surface navigation, steep-slope traverse protocols, and polar communications infrastructure.',
    recommendedEarthIds: ['earth-devon', 'earth-mauna-kea'],
    imageUrl: moonSouthPoleImg,
    imageAlt: 'Highland ridges near the lunar south pole under low-angle sunlight',
    demoTargetProfile: {
      geomorphology: 86,
      mineralogy: 74,
      thermalAridity: 92,
      solarPowerAnalogue: 90,
      operationsLogistics: 78,
    },
  },
  {
    id: 'moon-marius-hills',
    world: 'moon',
    name: 'Marius Hills Skylights',
    region: 'Oceanus Procellarum',
    coordinates: '14.09° N, 303.23° E',
    primaryFeature: 'Volcanic dome field and intact lava tube pits',
    missionContext:
      'Subsurface lava tubes are studied as natural radiation and micrometeoroid shelters for permanent habitats.',
    keyConditions: [
      'Basaltic mare lava plains with sinuous rilles and collapse pits',
      'Stable subsurface thermal environment inside intact lava tubes',
      'Fine volcanic regolith and angular basalt talus near pit rims',
    ],
    scientificInterest:
      'Demonstrates how volcanic caverns on Earth help engineers test subterranean mapping robots and sheltered habitat deployment.',
    recommendedEarthIds: ['earth-krafla', 'earth-mauna-kea'],
    imageAlt: 'Volcanic basalt plains and skylight terrain concept',
    demoTargetProfile: {
      geomorphology: 94,
      mineralogy: 90,
      thermalAridity: 78,
      solarPowerAnalogue: 70,
      operationsLogistics: 84,
    },
  },
  {
    id: 'moon-aristarchus',
    world: 'moon',
    name: 'Aristarchus Plateau',
    region: 'Northwestern Near Side',
    coordinates: '23.70° N, 312.60° E',
    primaryFeature: 'Pyroclastic glass deposits and Vallis Schröteri rille',
    missionContext:
      'Resource-rich volcanic plateau investigated for future oxygen and titanium extraction studies.',
    keyConditions: [
      'Dark mantling pyroclastic ash deposits rich in iron-bearing glass',
      'Complex tectonic and volcanic rille topography',
      'Extreme diurnal thermal swings at mid-latitudes',
    ],
    scientificInterest:
      'Strong Earth analogue pairing with basaltic volcanic fields for testing regolith excavation and resource extraction hardware.',
    recommendedEarthIds: ['earth-mauna-kea', 'earth-krafla'],
    imageAlt: 'Lunar volcanic plateau and rille formation',
    demoTargetProfile: {
      geomorphology: 88,
      mineralogy: 92,
      thermalAridity: 80,
      solarPowerAnalogue: 76,
      operationsLogistics: 80,
    },
  },
];

export const MARS_SITES: ExtraterrestrialSite[] = [
  {
    id: 'mars-jezero',
    world: 'mars',
    name: 'Jezero Crater',
    region: 'Isidis Planitia Rim',
    coordinates: '18.38° N, 77.58° E',
    primaryFeature: 'Ancient river delta, clay minerals, and lakebed carbonates',
    missionContext:
      'Landing site of NASA Perseverance rover exploring ancient habitable lake environments and collecting core samples.',
    keyConditions: [
      'Layered sedimentary fan deposits over basaltic crater floor',
      'Clay, carbonate, and iron-oxide mineral signatures',
      'Hyper-arid, cold desert conditions with pervasive windblown dust',
    ],
    scientificInterest:
      'A benchmark target for astrobiology field tests, drilling rigs, and autonomous hazard-avoidance navigation on rocky deltas.',
    recommendedEarthIds: ['earth-atacama', 'earth-rio-tinto'],
    imageUrl: marsJezeroImg,
    imageAlt: 'Jezero Crater layered sedimentary delta formations and iron-oxide terrain on Mars',
    demoTargetProfile: {
      geomorphology: 92,
      mineralogy: 94,
      thermalAridity: 95,
      solarPowerAnalogue: 82,
      operationsLogistics: 85,
    },
  },
  {
    id: 'mars-gale',
    world: 'mars',
    name: 'Gale Crater (Mount Sharp)',
    region: 'Aeolis Quadrangle',
    coordinates: '5.40° S, 137.80° E',
    primaryFeature: '5.5 km central sedimentary mountain with sulfate strata',
    missionContext:
      'Explored by NASA Curiosity rover to study Mars transition from ancient lakes to arid sulfate-bearing deserts.',
    keyConditions: [
      'Stratified mudstones, sandstones, and sulfate-rich evaporite layers',
      'Sharp wind-eroded ridges (yardangs) and dark basaltic sand dunes',
      'High UV exposure and hyper-arid soil chemistry',
    ],
    scientificInterest:
      'Closely mirrored by hyper-arid salt flats and oxidized desert basins on Earth for testing wheel durability and spectrometer calibration.',
    recommendedEarthIds: ['earth-atacama', 'earth-mcmurdo'],
    imageUrl: marsJezeroImg,
    imageAlt: 'Layered sedimentary Martian basin terrain',
    demoTargetProfile: {
      geomorphology: 88,
      mineralogy: 90,
      thermalAridity: 94,
      solarPowerAnalogue: 80,
      operationsLogistics: 84,
    },
  },
  {
    id: 'mars-arcadia',
    world: 'mars',
    name: 'Arcadia Planitia',
    region: 'Northern Lowlands',
    coordinates: '46.70° N, 188.00° E',
    primaryFeature: 'Smooth volcanic plains underlain by shallow water ice',
    missionContext:
      'Frequently studied as a candidate future crewed landing zone due to low elevation and accessible subsurface ice.',
    keyConditions: [
      'Flat terrain favorable for safe heavy-payload landings',
      'Subsurface water ice sheets detected within meters of the surface',
      'Cold polar-desert temperatures and seasonal frost cycles',
    ],
    scientificInterest:
      'Polar permafrost deserts on Earth help engineers practice ice-drilling and in-situ water extraction before crewed missions.',
    recommendedEarthIds: ['earth-mcmurdo', 'earth-devon'],
    imageAlt: 'Flat Martian northern plains terrain',
    demoTargetProfile: {
      geomorphology: 84,
      mineralogy: 78,
      thermalAridity: 95,
      solarPowerAnalogue: 78,
      operationsLogistics: 88,
    },
  },
  {
    id: 'mars-mawrth',
    world: 'mars',
    name: 'Mawrth Vallis',
    region: 'Chryse Planitia Margin',
    coordinates: '22.30° N, 343.50° E',
    primaryFeature: 'Thick phyllosilicate clay outcrops and ancient outflow channel',
    missionContext:
      'Major astrobiology candidate region containing iron- and magnesium-rich clays formed in ancient water.',
    keyConditions: [
      'Exposed hydrated phyllosilicates and iron-oxide bedrock layers',
      'Heavily weathered plateau dissected by ancient water channels',
      'Acidic and oxidative surface weathering history',
    ],
    scientificInterest:
      'Acidic iron-rich environments on Earth allow scientists to calibrate biosignature instruments for clay-hosted targets.',
    recommendedEarthIds: ['earth-rio-tinto', 'earth-atacama'],
    imageAlt: 'Clay-bearing Martian outflow channel geology',
    demoTargetProfile: {
      geomorphology: 85,
      mineralogy: 95,
      thermalAridity: 88,
      solarPowerAnalogue: 79,
      operationsLogistics: 82,
    },
  },
];

export const EARTH_ANALOGUES: EarthAnalogueSite[] = [
  {
    id: 'earth-devon',
    name: 'Haughton Impact Crater, Devon Island',
    countryOrRegion: 'Nunavut, Canadian High Arctic',
    coordinates: '75.38° N, 89.68° W',
    elevation: '250 m',
    category: 'Polar & Impact',
    targetWorlds: ['moon', 'mars'],
    summary:
      'A 23 km wide meteorite impact crater in an uninhabited polar desert, home to the Haughton-Mars Project.',
    geologicalMatch:
      'Shattered impact breccia, permafrost ground-ice, lack of vegetation, and canyon networks resemble both lunar impact highlands and Martian polar basins.',
    fieldResearchUse:
      'Used by NASA and partner teams to test pressurized rovers, spacesuit mobility, lunar polar lighting ops, and subsurface ice drills.',
    climateNotes: 'Polar desert · Sub-zero mean temperatures · Continuous summer daylight',
    imageUrl: earthDevonImg,
    imageAlt: 'Researchers conducting geological sampling at Haughton Impact Crater on Devon Island',
    demoProfile: {
      geomorphology: 92,
      mineralogy: 78,
      thermalAridity: 89,
      solarPowerAnalogue: 86,
      operationsLogistics: 80,
    },
  },
  {
    id: 'earth-atacama',
    name: 'Atacama Desert (Yungay & Salar Basins)',
    countryOrRegion: 'Northern Chile',
    coordinates: '24.08° S, 69.91° W',
    elevation: '1,000 – 2,500 m',
    category: 'Hyper-Arid Desert',
    targetWorlds: ['mars'],
    summary:
      'The oldest and driest non-polar desert on Earth, widely used as a premier Mars soil and astrobiology testbed.',
    geologicalMatch:
      'Hyper-arid iron-rich soils, perchlorate/nitrate salt crusts, ancient evaporite basins, and extreme UV radiation mirror Martian regolith.',
    fieldResearchUse:
      'Field testing ground for Mars rover autonomy, life-detection drills, and Raman/X-ray spectrometers.',
    climateNotes: 'Hyper-arid · < 2 mm annual rain in core zone · High UV flux',
    imageUrl: earthAtacamaImg,
    imageAlt: 'Field team operating a test rover across hyper-arid terrain in the Atacama Desert',
    demoProfile: {
      geomorphology: 89,
      mineralogy: 93,
      thermalAridity: 96,
      solarPowerAnalogue: 84,
      operationsLogistics: 91,
    },
  },
  {
    id: 'earth-mcmurdo',
    name: 'McMurdo Dry Valleys',
    countryOrRegion: 'Victoria Land, Antarctica',
    coordinates: '77.47° S, 162.52° E',
    elevation: '100 – 1,500 m',
    category: 'Polar & Impact',
    targetWorlds: ['moon', 'mars'],
    summary:
      'Ice-free, hyper-arid cold desert valleys in Antarctica with permafrost just centimeters beneath dry gravel.',
    geologicalMatch:
      'Sublimation-dominated icy permafrost, salt-encrusted soils, and katabatic wind erosion resemble Martian northern plains and lunar polar cold traps.',
    fieldResearchUse:
      'Benchmarks cryogenic sample return, planetary protection protocols, and extreme cold habitat insulation.',
    climateNotes: 'Antarctic polar desert · -20°C average · Extremely low humidity',
    imageAlt: 'Ice-free polar desert terrain of McMurdo Dry Valleys in Antarctica',
    demoProfile: {
      geomorphology: 87,
      mineralogy: 80,
      thermalAridity: 97,
      solarPowerAnalogue: 85,
      operationsLogistics: 68,
    },
  },
  {
    id: 'earth-mauna-kea',
    name: 'Mauna Kea Volcanic Slopes',
    countryOrRegion: 'Hawaiʻi Island, USA',
    coordinates: '19.76° N, 155.47° W',
    elevation: '2,800 – 4,100 m',
    category: 'Volcanic & Basalt',
    targetWorlds: ['moon', 'mars'],
    summary:
      'High-altitude basaltic tephra and volcanic cinder cones used extensively for lunar and Martian regolith testing.',
    geologicalMatch:
      'Fine volcanic ash and iron-rich basaltic lava flows closely approximate lunar mare regolith and Martian volcanic terrains.',
    fieldResearchUse:
      'Site of ISRU (oxygen extraction from regolith) trials, rover traction testing, and HI-SEAS analog habitat studies.',
    climateNotes: 'High-altitude alpine volcanic desert · Sparse vegetation · Thin air',
    imageAlt: 'High-altitude volcanic tephra and basaltic cinder cones on Mauna Kea',
    demoProfile: {
      geomorphology: 88,
      mineralogy: 92,
      thermalAridity: 74,
      solarPowerAnalogue: 83,
      operationsLogistics: 92,
    },
  },
  {
    id: 'earth-krafla',
    name: 'Krafla & Askja Volcanic Highlands',
    countryOrRegion: 'Northeastern Iceland',
    coordinates: '65.71° N, 16.75° W',
    elevation: '600 – 1,100 m',
    category: 'Volcanic & Basalt',
    targetWorlds: ['moon', 'mars'],
    summary:
      'Young basaltic lava fields, lava tubes, and ash plains where Apollo astronauts trained before lunar surface EVAs.',
    geologicalMatch:
      'Unweathered basaltic lava flows, collapse tubes, and palagonite ridges match Marius Hills skylights and young Martian volcanics.',
    fieldResearchUse:
      'Used for EVA geology training, drone/rover lava tube mapping, and basaltic soil chemistry calibration.',
    climateNotes: 'Sub-arctic volcanic highlands · Cool & windy · Minimal vegetation',
    imageAlt: 'Basaltic lava plains and volcanic terrain in Krafla, northeastern Iceland',
    demoProfile: {
      geomorphology: 94,
      mineralogy: 91,
      thermalAridity: 72,
      solarPowerAnalogue: 74,
      operationsLogistics: 89,
    },
  },
  {
    id: 'earth-rio-tinto',
    name: 'Río Tinto Acidic Basin',
    countryOrRegion: 'Andalusia, Spain',
    coordinates: '37.70° N, 6.55° W',
    elevation: '410 m',
    category: 'Hyper-Arid Desert',
    targetWorlds: ['mars'],
    summary:
      'An iron-rich, highly acidic river basin preserving jarosite and hematite minerals identical to Mars discoveries.',
    geologicalMatch:
      'Sulfur- and iron-oxide mineral assemblages match Opportunity and Perseverance discoveries in ancient Martian lakebeds.',
    fieldResearchUse:
      'Crucial for testing Mars subsurface drills (like Rosalind Franklin / ExoMars prototypes) and extremophile biosignatures.',
    climateNotes: 'Mediterranean semi-arid · Acidic iron-sulfate geochemistry',
    imageAlt: 'Iron-oxide and sulfate mineral formations in the Río Tinto basin, Spain',
    demoProfile: {
      geomorphology: 80,
      mineralogy: 96,
      thermalAridity: 70,
      solarPowerAnalogue: 77,
      operationsLogistics: 94,
    },
  },
];

export interface ComparisonWeights {
  geomorphology: number;
  mineralogy: number;
  thermalAridity: number;
  solarPowerAnalogue: number;
  operationsLogistics: number;
}

export const DEFAULT_WEIGHTS: ComparisonWeights = {
  geomorphology: 30,
  mineralogy: 25,
  thermalAridity: 20,
  solarPowerAnalogue: 15,
  operationsLogistics: 10,
};

export const FACTOR_LABELS: Record<keyof ComparisonWeights, { label: string; short: string; description: string }> = {
  geomorphology: {
    label: 'Terrain & Geomorphology',
    short: 'Terrain',
    description: 'Similarity in craters, lava tubes, slopes, canyons, or sedimentary deltas.',
  },
  mineralogy: {
    label: 'Regolith & Mineralogy',
    short: 'Minerals',
    description: 'Match in basalt, clays, sulfates, iron oxides, or impact breccia chemistry.',
  },
  thermalAridity: {
    label: 'Cold & Aridity Extremes',
    short: 'Aridity/Cold',
    description: 'Degree of dryness, permafrost, or low-humidity environmental stress.',
  },
  solarPowerAnalogue: {
    label: 'Illumination & Power',
    short: 'Illumination',
    description: 'Seasonal daylight geometry or polar grazing-angle solar test suitability.',
  },
  operationsLogistics: {
    label: 'Field Test Accessibility',
    short: 'Logistics',
    description: 'Practicality for deploying rovers, habitats, and astronaut training crews.',
  },
};

/**
 * Computes an illustrative weighted similarity score (0-100) between a target
 * Moon/Mars site profile and an Earth analogue profile.
 * Clearly surfaced in the UI as Sample Demonstration Data.
 */
export function computeDemoAnalogueScore(
  target: ScienceProfile,
  earth: ScienceProfile,
  weights: ComparisonWeights
): number {
  const keys = Object.keys(weights) as (keyof ComparisonWeights)[];
  const totalWeight = keys.reduce((sum, k) => sum + weights[k], 0);
  if (totalWeight === 0) return 0;

  let weightedMatch = 0;
  for (const key of keys) {
    const diff = Math.abs(target[key] - earth[key]);
    // Combine closeness to target profile with the Earth site's fidelity score
    const closeness = Math.max(0, 100 - diff);
    const fidelityBlend = closeness * 0.6 + earth[key] * 0.4;
    weightedMatch += fidelityBlend * weights[key];
  }

  return Math.round((weightedMatch / totalWeight) * 10) / 10;
}
