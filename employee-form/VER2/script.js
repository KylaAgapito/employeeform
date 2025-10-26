
const region = document.getElementById('region');
const cities = document.getElementById('cities'); 
const barangays = document.getElementById('barangay'); 
const province = document.getElementById('province');


let data_cache = null;
let barangays_cache = null;
let provinces_cache = null;

// Load cities.json (cached)
async function getData() {
  if (data_cache) 
    return data_cache; 
  const res = await fetch('cities.json'); 
  data_cache = await res.json(); 
  return data_cache;
}

// Load barangays.json (cached)
async function getBarangays() {
  if (barangays_cache) 
    return barangays_cache;
  const r = await fetch('barangays.json');
  barangays_cache = await r.json();
  return barangays_cache;
}

// Load province.json (cached)
async function getProvinces() {
  if (provinces_cache)
    return provinces_cache;
  const r = await fetch('province.json');
  provinces_cache = await r.json();
  return provinces_cache;
}

// Populate city select
function setOptions(list) {
  cities.innerHTML = ''; 

  const placeholder = document.createElement('option');
  placeholder.value = '';
  placeholder.textContent = list && list.length ? 'Select a city' : 'Please Select a region first';
  cities.appendChild(placeholder);

  if (!list) { 
    cities.disabled = true; 
    return; }

  list.forEach(c => {
    const o = document.createElement('option');
    o.value = c.value;        
    o.textContent = c.label;  
    cities.appendChild(o);
  });

  cities.disabled = false;
}

// Populate barangay select
function setBarangayOptions(list) {
  if (!barangays)
     return;
  barangays.innerHTML = '';
  const ph = document.createElement('option');
  ph.value = '';
  ph.textContent = list && list.length ? 'Select a barangay' : 'Select a city first';
  barangays.appendChild(ph);
  if (!list) 
    { 
      barangays.disabled = true; 
      return; 
    }
    
  list.forEach(b => {
    const o = document.createElement('option');
    o.value = b.value; o.textContent = b.label; barangays.appendChild(o);
  });
  barangays.disabled = false;
}

// Populate province select (uses same region array as cities)
function setProvinceOptions(list) {
  if (!province)
    return;
  province.innerHTML = '';
  const ph = document.createElement('option');
  ph.value = '';
  ph.textContent = list && list.length ? 'Select a province' : 'Select a region first';
  province.appendChild(ph);
  if (!list) { province.disabled = true; return; }

  list.forEach(p => {
    const o = document.createElement('option');
    o.value = p.value; o.textContent = p.label; province.appendChild(o);
  });
  province.disabled = false;
}

region && region.addEventListener('change', async () => {
  const key = region.value; 
  if (!key){ 
    setOptions(null); 
    setProvinceOptions(null);
    return; } 
  try {
    const d = await getData();        
    // when region selected: clear cities/barangays, populate province list and keep cities disabled
    setOptions(null);
    setBarangayOptions(null);
    try {
      const p = await getProvinces();
      setProvinceOptions(p[key + '-province'] || []);
      if (province) province.value = '';
    } catch (pe) {
      setProvinceOptions(null);
    }
  } catch (e) {
    setOptions(null);
  }
});


setOptions(null);
setBarangayOptions(null);
setProvinceOptions(null);


cities && cities.addEventListener('change', async () => {
  if (!barangays) 
    return;

  const key = cities.value;
  if (!key) { 
    setBarangayOptions(null); 
    return;}
  
  try {
    const data = await getBarangays();
    setBarangayOptions(data[key] || []);
    // now populate provinces for the current region and attempt auto-select
    try {
      const regionKey = region && region.value ? region.value : null;
      if (regionKey) {
        const p = await getProvinces();
        const list = p[regionKey + '-province'] || [];
        setProvinceOptions(list);

        // mapping from city value -> province value (matches province.json values)
        const cityToProvince = {
          'manila': 'metro-manila',
          'marikina': 'metro-manila',
          'pasay': 'metro-manila',
          'quezon-city': 'metro-manila',
          'antipolo': 'rizal',
          'batangas': 'batangas',
          'cavite': 'cavite',
          'dasmarinas': 'cavite',
          'baliwag': 'bulacan',
          'malolos': 'bulacan',
          'san-jose-del-monte': 'bulacan',
          'tarlac': 'tarlac',
          'baguio': 'benguet',
          'la-trinidad': 'benguet',
          'bangued': 'abra',
          'barlig': 'mountain-province'
        };

        const mapped = cityToProvince[key];
        if (mapped && province) {
          const opt = Array.from(province.options).find(o => o.value === mapped);
          if (opt) province.value = mapped;
        }
      }
    } catch (e) {
      // non-fatal; ignore
    }
  } catch (err) {
    setBarangayOptions(null);
  }
});

// When province is selected, enable and populate cities filtered by province
province && province.addEventListener('change', async () => {
  const prov = province.value;
  const regionKey = region && region.value ? region.value : null;
  if (!prov || !regionKey) {
    setOptions(null);
    return;
  }

  try {
    const d = await getData();
    const regionCities = d[regionKey] || [];

    // mapping city -> province (values match province.json 'value')
    const cityToProvince = {
      'manila': 'metro-manila',
      'marikina': 'metro-manila',
      'pasay': 'metro-manila',
      'quezon-city': 'metro-manila',
      'antipolo': 'rizal',
      'batangas': 'batangas',
      'cavite': 'cavite',
      'dasmarinas': 'cavite',
      'baliwag': 'bulacan',
      'malolos': 'bulacan',
      'san-jose-del-monte': 'bulacan',
      'tarlac': 'tarlac',
      'baguio': 'benguet',
      'la-trinidad': 'benguet',
      'bangued': 'abra',
      'barlig': 'mountain-province'
    };

    const filtered = regionCities.filter(c => cityToProvince[c.value] === prov);
    if (!filtered || filtered.length === 0) {
      setOptions(null);
      return;
    }

    setOptions(filtered);
    // reset barangays when city list changes
    setBarangayOptions(null);
  } catch (e) {
    setOptions(null);
  }
});
