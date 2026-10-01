(function () {
  'use strict';

  /* =====================================================
     DATOS CENTRALES (catálogo, servicios y contacto)
     El catálogo y el chatbot leen de las mismas estructuras.
     ===================================================== */

  const contactInfo = {
    name: 'PETSLAND',
    owner: 'Andrea Vargas',
    address: 'Calle 73 B #113 A-52, Bogotá, Colombia.',
    phone: '320 3193564',
    tel: 'tel:+573203193564',
    wa: 'https://wa.me/573203193564',
    email: 'Andrea.mendoza8412@gmail.com',
    ig: '@petsland_26',
    igUrl: 'https://www.instagram.com/petsland_26/'
  };

  const SPECIES_LABEL = { perro: 'Perro', gato: 'Gato', general: 'Mascotas' };
  const TYPE_LABEL = { seco: 'Alimento seco', humedo: 'Alimento húmedo', snack: 'Snack', arena: 'Arena sanitaria', accesorio: 'Accesorio' };
  const TYPE_EMOJI = { seco: '🍖', humedo: '🥫', snack: '🍪', arena: '🪨' };

  const ACC_CATS = {
    correas: { label: 'Correas', emoji: '🦮' },
    collares: { label: 'Collares', emoji: '🐕' },
    pecheras: { label: 'Pecheras y arneses', emoji: '🦺' },
    panoletas: { label: 'Pañoletas', emoji: '🎀' },
    juguetes: { label: 'Juguetes', emoji: '🎾' },
    camas: { label: 'Camas', emoji: '🛏️' },
    comederos: { label: 'Comederos', emoji: '🥣' },
    bebederos: { label: 'Bebederos', emoji: '💧' },
    transportadores: { label: 'Transportadores', emoji: '🧳' }
  };

  // [marca, nombre, especie, tipo, presentación, precio]
  const RAW_FOOD = [
    // ---- Perros
    ['Monello', 'Monello Perro Adulto Raza Pequeña', 'perro', 'seco', '1 kg', 20000],
    ['Monello', 'Monello Perro Adulto Tradicional', 'perro', 'seco', '1 kg', 19000],
    ['Monello', 'Monello Perro Adulto Tradicional', 'perro', 'seco', '15 kg', 205000],
    ['Monello', 'Monello Perro Adulto Raza Pequeña', 'perro', 'seco', '2,5 kg', 45000],
    ['Chunky', 'Chunky Perro Adulto Pollo', 'perro', 'seco', '2 kg', 23000],
    ['Chunky', 'Chunky Perro Cachorro', 'perro', 'seco', '2 kg', 28000],
    ['Chunky', 'Chunky Perro Adulto Cordero, Arroz y Salmón', 'perro', 'seco', '1,5 kg', 36000],
    ['Chunky', 'Chunky Adulto', 'perro', 'seco', '1,5 kg', 21000],
    ['Chunky', 'Chunky Húmedo Res', 'perro', 'humedo', '100 g', 3500],
    ['Chunky', 'Chunky Húmedo Pavo', 'perro', 'humedo', '100 g', 3500],
    ['Dog Chow', 'Dog Chow Adulto Medianos y Grandes', 'perro', 'seco', '2 kg', 26000],
    ['Dog Chow', 'Dog Chow Cachorros', 'perro', 'seco', '1 kg', 16500],
    ['Dog Chow', 'Dog Chow Cachorros', 'perro', 'seco', '2 kg', 30500],
    ['Dog Chow', 'Dog Chow Control de Peso', 'perro', 'seco', '2 kg', 30000],
    ['Dog Chow', 'Dog Chow Selección Proteína Cordero', 'perro', 'seco', '2 kg', 28000],
    ['Dog Chow', 'Dog Chow Digestión', 'perro', 'seco', '2 kg', 25000],
    ['Dog Chow', 'Dog Chow Húmedo', 'perro', 'humedo', '85/100 g', 3200],
    ['Pedigree', 'Pedigree Adulto', 'perro', 'seco', '2 kg', 22000],
    ['Pedigree', 'Pedigree Cachorro', 'perro', 'seco', '2 kg', 23000],
    ['Pedigree', 'Pedigree Adulto Raza Pequeña', 'perro', 'seco', '2 kg', 24000],
    ['Pedigree', 'Pedigree Húmedo Adulto', 'perro', 'humedo', '100 g', 3300],
    ['Pedigree', 'Pedigree Húmedo Cachorro', 'perro', 'humedo', '100 g', 3300],
    ['Ringo', 'Ringo Adulto', 'perro', 'seco', '1 kg', 9000],
    ['Ringo', 'Ringo Pro Adultos', 'perro', 'seco', '2 kg', 16000],
    ['Ringo', 'Ringo Adulto', 'perro', 'seco', '4 kg', 30000],
    ['Dogourmet', 'Dogourmet Adulto Carne Parrilla', 'perro', 'seco', '1 kg', 15000],
    ['Dogourmet', 'Dogourmet Adulto Carne Parrilla', 'perro', 'seco', '2 kg', 22000],
    ['Dogourmet', 'Dogourmet Adulto Carne Parrilla', 'perro', 'seco', '4 kg', 45000],
    ['Max', 'Max Adulto', 'perro', 'seco', '2 kg', 27000],
    ['Max', 'Max Adulto', 'perro', 'seco', '10 kg', 120000],
    ['Max', 'Max Professional Line', 'perro', 'seco', '15 kg', 220000],
    ['Purina One', 'Purina One Perro Adulto', 'perro', 'seco', '2 kg', 55000],
    ['Purina One', 'Purina One Cachorro', 'perro', 'seco', '2 kg', 58000],
    ['Purina One', 'Purina One Húmedo', 'perro', 'humedo', '85 g', 5200],
    ['Pro Plan', 'Pro Plan Perro Adulto', 'perro', 'seco', '1 kg', 80000],
    ['Pro Plan', 'Pro Plan Perro Adulto', 'perro', 'seco', '3 kg', 175000],
    ['Pro Plan', 'Pro Plan Puppy', 'perro', 'seco', '3 kg', 175000],
    ['Royal Canin', 'Royal Canin Mini Adult', 'perro', 'seco', '1 kg', 78000],
    ['Royal Canin', 'Royal Canin Medium Adult', 'perro', 'seco', '1 kg', 78000],
    ['Royal Canin', 'Royal Canin Maxi Adult', 'perro', 'seco', '1 kg', 78000],
    ['Royal Canin', 'Royal Canin Puppy', 'perro', 'seco', '1 kg', 82000],
    ['Taste of the Wild', 'Taste of the Wild Pacific Stream', 'perro', 'seco', '2 kg aprox.', 95000],
    ['Taste of the Wild', 'Taste of the Wild High Prairie', 'perro', 'seco', '2 kg aprox.', 95000],
    // ---- Gatos
    ['Monello', 'Monello Gato Adulto Salmón', 'gato', 'seco', '1 kg', 28000],
    ['Monello', 'Monello Gato Castrado', 'gato', 'seco', '1 kg', 28000],
    ['Monello', 'Monello Gato Gatitos', 'gato', 'seco', '1 kg', 28000],
    ['Monello', 'Monello Gato Adulto Salmón y Pollo', 'gato', 'seco', '7 kg', 135000],
    ['Cat Chow', 'Cat Chow Adulto Pescado', 'gato', 'seco', '500 g', 14000],
    ['Cat Chow', 'Cat Chow Adulto Pescado', 'gato', 'seco', '1,5 kg', 42000],
    ['Cat Chow', 'Cat Chow Adulto Pescado', 'gato', 'seco', '2 kg', 42000],
    ['Cat Chow', 'Cat Chow Esterilizados', 'gato', 'seco', '500 g', 14000],
    ['Cat Chow', 'Cat Chow Gatitos', 'gato', 'seco', '500 g', 14000],
    ['Mirringo', 'Mirringo Gaticos', 'gato', 'seco', '1 kg', 14000],
    ['Mirringo', 'Mirringo Adulto', 'gato', 'seco', '1 kg', 12000],
    ['Mirringo', 'Mirringo Cuidado Urinario', 'gato', 'seco', '1 kg', 15000],
    ['Mirringo', 'Mirringo Adulto', 'gato', 'seco', '8 kg', 96000],
    ['Whiskas', 'Whiskas Adulto', 'gato', 'seco', '1 kg', 25000],
    ['Whiskas', 'Whiskas Gatito', 'gato', 'seco', '1 kg', 27000],
    ['Whiskas', 'Whiskas Húmedo Adulto', 'gato', 'humedo', '85 g', 3500],
    ['Whiskas', 'Whiskas Húmedo Castrado', 'gato', 'humedo', '85 g', 3500],
    ['Whiskas', 'Whiskas Húmedo Gatito', 'gato', 'humedo', '85 g', 3500],
    ['Felix', 'Felix Húmedo', 'gato', 'humedo', '85 g', 4000],
    ['Felix', 'Felix Paté', 'gato', 'humedo', '156 g', 6500],
    ['Felix', 'Felix Pack', 'gato', 'humedo', '8 unidades', 22000],
    ['Pro Plan', 'Pro Plan Gato Adulto Esterilizado', 'gato', 'seco', '1 kg', 82000],
    ['Pro Plan', 'Pro Plan Gato Adulto Esterilizado', 'gato', 'seco', '3 kg', 170000],
    ['Pro Plan', 'Pro Plan Gatitos', 'gato', 'seco', '3 kg', 165000],
    ['Royal Canin', 'Royal Canin Gato Adulto', 'gato', 'seco', '1 kg', 80000],
    ['Royal Canin', 'Royal Canin Gato Esterilizado', 'gato', 'seco', '1 kg', 85000],
    ['Royal Canin', 'Royal Canin Kitten', 'gato', 'seco', '1 kg', 85000],
    ['BR For Cat', 'BR For Cat Pure Adulto Pollo', 'gato', 'seco', '1 kg', 28000],
    ['BR For Cat', 'BR For Cat Gatitos', 'gato', 'seco', '1 kg', 35000],
    ['Agility Gold', 'Agility Gold Gato', 'gato', 'seco', '1,5 kg', 53000],
    ['Donkat', 'Donkat Adulto', 'gato', 'seco', '1 kg', 14000],
    ['Donkat', 'Donkat Adulto', 'gato', 'seco', '8 kg', 82000],
    // ---- Arena sanitaria
    ['Mirringo', 'Mirringo Arena', 'gato', 'arena', '5 kg', 29000],
    ['Mirringo', 'Mirringo Arena', 'gato', 'arena', '10 kg', 52000],
    ['King Cat', 'King Cat Arena', 'gato', 'arena', '8 kg', 32000],
    ['', 'Arena sanitaria básica', 'gato', 'arena', '5 kg', 24000],
    ['', 'Arena sanitaria premium', 'gato', 'arena', '10 kg', 55000],
    // ---- Premios y snacks
    ['', 'Hueso pequeño', 'perro', 'snack', 'Unidad', 10000],
    ['', 'Hueso grande', 'perro', 'snack', 'Unidad', 32000],
    ['', 'Oreja de cerdo', 'perro', 'snack', 'Unidad', 12000],
    ['', 'Snack dental', 'perro', 'snack', 'Unidad', 15000],
    ['', 'Premios para entrenamiento', 'perro', 'snack', 'Unidad', 12000],
    ['', 'Galletas para perro', 'perro', 'snack', 'Unidad', 10000]
  ];

  // [categoría, nombre, especie, presentación, precio]
  const RAW_ACC = [
    ['correas', 'Correa básica', 'general', 'Unidad', 15000],
    ['correas', 'Correa reforzada', 'general', 'Unidad', 25000],
    ['correas', 'Correa retráctil', 'general', 'Unidad', 45000],
    ['correas', 'Correa para perro grande', 'perro', 'Unidad', 35000],
    ['correas', 'Correa para gato', 'gato', 'Unidad', 20000],
    ['correas', 'Correa tipo traílla', 'general', 'Unidad', 13000],
    ['collares', 'Collar básico perro pequeño', 'perro', 'Unidad', 15000],
    ['collares', 'Collar perro mediano', 'perro', 'Unidad', 20000],
    ['collares', 'Collar perro grande', 'perro', 'Unidad', 25000],
    ['collares', 'Collar para gato', 'gato', 'Unidad', 18000],
    ['collares', 'Collar ajustable', 'general', 'Unidad', 22000],
    ['pecheras', 'Pechera pequeña', 'general', 'Talla pequeña', 30000],
    ['pecheras', 'Pechera mediana', 'general', 'Talla mediana', 38000],
    ['pecheras', 'Pechera grande', 'general', 'Talla grande', 45000],
    ['pecheras', 'Arnés reforzado', 'general', 'Unidad', 50000],
    ['panoletas', 'Pañoleta pequeña', 'general', 'Talla pequeña', 12000],
    ['panoletas', 'Pañoleta mediana', 'general', 'Talla mediana', 15000],
    ['panoletas', 'Pañoleta grande', 'general', 'Talla grande', 18000],
    ['panoletas', 'Pañoleta personalizada', 'general', 'Unidad', 25000],
    ['juguetes', 'Pelota', 'general', 'Unidad', 10000],
    ['juguetes', 'Pelota resistente', 'general', 'Unidad', 18000],
    ['juguetes', 'Juguete mordedor', 'general', 'Unidad', 15000],
    ['juguetes', 'Juguete de cuerda', 'general', 'Unidad', 18000],
    ['juguetes', 'Juguete interactivo', 'general', 'Unidad', 30000],
    ['juguetes', 'Juguete para gato', 'gato', 'Unidad', 12000],
    ['juguetes', 'Caña para gato', 'gato', 'Unidad', 15000],
    ['camas', 'Cama pequeña', 'general', 'Talla pequeña', 45000],
    ['camas', 'Cama mediana', 'general', 'Talla mediana', 65000],
    ['camas', 'Cama grande', 'general', 'Talla grande', 80000],
    ['camas', 'Cama premium', 'general', 'Unidad', 120000],
    ['comederos', 'Comedero básico', 'general', 'Unidad', 15000],
    ['comederos', 'Comedero doble', 'general', 'Unidad', 25000],
    ['comederos', 'Comedero elevado', 'general', 'Unidad', 35000],
    ['bebederos', 'Bebedero', 'general', 'Unidad', 18000],
    ['bebederos', 'Bebedero portátil', 'general', 'Unidad', 25000],
    ['transportadores', 'Transportador pequeño', 'general', 'Talla pequeña', 80000],
    ['transportadores', 'Transportador mediano', 'general', 'Talla mediana', 110000],
    ['transportadores', 'Transportador grande', 'general', 'Talla grande', 150000]
  ];

  // [grupo, nombre, precio, descripción, etiquetas]
  const SERVICE_GROUPS = {
    consulta: 'Consulta y atención',
    higiene: 'Higiene',
    peluqueria: 'Peluquería y estética',
    prevencion: 'Prevención',
    medicos: 'Servicios médicos'
  };
  const RAW_SERVICES = [
    ['consulta', 'Consulta veterinaria general', 50000, 'Atención veterinaria general para tu mascota.', ['consulta', 'general']],
    ['consulta', 'Consulta de control', 40000, 'Consulta para hacer seguimiento a tu mascota.', ['consulta', 'control']],
    ['consulta', 'Valoración básica', 45000, 'Valoración básica de tu mascota.', ['valoracion']],
    ['consulta', 'Orientación veterinaria', 35000, 'Orientación para resolver dudas de cuidado.', ['orientacion']],

    ['higiene', 'Baño perro pequeño', 40000, 'Baño para perros de talla pequeña.', ['bano', 'perro', 'pequeno']],
    ['higiene', 'Baño perro mediano', 50000, 'Baño para perros de talla mediana.', ['bano', 'perro', 'mediano']],
    ['higiene', 'Baño perro grande', 60000, 'Baño para perros de talla grande.', ['bano', 'perro', 'grande']],
    ['higiene', 'Baño perro extra grande', 70000, 'Baño para perros de talla extra grande.', ['bano', 'perro', 'extra']],
    ['higiene', 'Baño gato', 45000, 'Baño para gatos.', ['bano', 'gato']],
    ['higiene', 'Corte de uñas', 15000, 'Corte de uñas para tu mascota.', ['unas']],
    ['higiene', 'Limpieza externa de oídos', 15000, 'Limpieza externa de los oídos.', ['oidos']],
    ['higiene', 'Cepillado', 20000, 'Cepillado del pelaje.', ['cepillado']],

    ['peluqueria', 'Peluquería perro pequeño', 55000, 'Peluquería para perros de talla pequeña.', ['peluqueria', 'perro', 'pequeno']],
    ['peluqueria', 'Peluquería perro mediano', 70000, 'Peluquería para perros de talla mediana.', ['peluqueria', 'perro', 'mediano']],
    ['peluqueria', 'Peluquería perro grande', 90000, 'Peluquería para perros de talla grande.', ['peluqueria', 'perro', 'grande']],
    ['peluqueria', 'Peluquería perro extra grande', 110000, 'Peluquería para perros de talla extra grande.', ['peluqueria', 'perro', 'extra']],
    ['peluqueria', 'Corte higiénico', 35000, 'Corte higiénico.', ['corte-higienico']],
    ['peluqueria', 'Deslanado', 35000, 'Deslanado del pelaje.', ['deslanado']],
    ['peluqueria', 'Baño + corte de uñas, perro pequeño', 50000, 'Baño y corte de uñas para perros de talla pequeña.', ['bano', 'unas', 'perro', 'pequeno']],
    ['peluqueria', 'Baño + corte de uñas, perro mediano', 60000, 'Baño y corte de uñas para perros de talla mediana.', ['bano', 'unas', 'perro', 'mediano']],
    ['peluqueria', 'Baño + corte de uñas, perro grande', 75000, 'Baño y corte de uñas para perros de talla grande.', ['bano', 'unas', 'perro', 'grande']],

    ['prevencion', 'Desparasitación gato', 35000, 'Desparasitación para gatos.', ['desparasitacion', 'gato']],
    ['prevencion', 'Desparasitación perro pequeño', 35000, 'Desparasitación para perros de talla pequeña.', ['desparasitacion', 'perro', 'pequeno']],
    ['prevencion', 'Desparasitación perro mediano', 40000, 'Desparasitación para perros de talla mediana.', ['desparasitacion', 'perro', 'mediano']],
    ['prevencion', 'Desparasitación perro grande', 45000, 'Desparasitación para perros de talla grande.', ['desparasitacion', 'perro', 'grande']],
    ['prevencion', 'Vacunación básica', 45000, 'Vacunación básica.', ['vacunacion']],

    ['medicos', 'Esterilización gato macho', 180000, 'Esterilización para gato macho.', ['esterilizacion', 'gato']],
    ['medicos', 'Esterilización gata', 250000, 'Esterilización para gata.', ['esterilizacion', 'gato']],
    ['medicos', 'Esterilización perro pequeño', 250000, 'Esterilización para perros de talla pequeña.', ['esterilizacion', 'perro', 'pequeno']],
    ['medicos', 'Esterilización perro mediano', 300000, 'Esterilización para perros de talla mediana.', ['esterilizacion', 'perro', 'mediano']],
    ['medicos', 'Esterilización perro grande', 350000, 'Esterilización para perros de talla grande.', ['esterilizacion', 'perro', 'grande']],
    ['medicos', 'Profilaxis dental básica', 250000, 'Profilaxis dental básica.', ['profilaxis']],
    ['medicos', 'Radiografía simple', 100000, 'Radiografía simple.', ['radiografia']],
    ['medicos', 'Ecografía', 150000, 'Ecografía.', ['ecografia']],
    ['medicos', 'Hemograma', 70000, 'Hemograma.', ['hemograma']],
    ['medicos', 'Hospitalización por día', 120000, 'Hospitalización, valor por día.', ['hospitalizacion']],
    ['medicos', 'Urgencia veterinaria', 80000, 'Atención de urgencia veterinaria.', ['urgencia']]
  ];

  /* ---------- Utilidades ---------- */
  const $ = (sel, root) => (root || document).querySelector(sel);
  const $$ = (sel, root) => Array.from((root || document).querySelectorAll(sel));
  const norm = (s) => String(s || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9,.\s@_+-]/g, ' ').replace(/\s+/g, ' ').trim();
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const fmtPrice = (n) => '$' + String(n).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  const waLink = (text) => contactInfo.wa + (text ? '?text=' + encodeURIComponent(text) : '');
  const stageOf = (name) => {
    const s = norm(name);
    if (/cachorro|puppy|kitten|gatito|gaticos/.test(s)) return 'Cachorro';
    if (/adulto|adult/.test(s)) return 'Adulto';
    return 'Todas las edades';
  };

  /* ---------- Construcción de products[] y services[] ---------- */
  const products = [];
  RAW_FOOD.forEach((r, i) => {
    const [brand, name, species, category, presentation, price] = r;
    const speciesWord = species === 'perro' ? 'perros' : 'gatos';
    let description;
    if (category === 'arena') description = 'Arena sanitaria para gatos. Presentación: ' + presentation + '.';
    else if (category === 'snack') description = 'Premio o snack para perros.';
    else description = TYPE_LABEL[category] + ' para ' + speciesWord + '. Presentación: ' + presentation + '.';
    products.push({
      id: 'f' + (i + 1), group: 'food', name, brand, species,
      stage: (category === 'seco' || category === 'humedo') ? stageOf(name) : 'Todas las edades',
      category, presentation, price, description
    });
  });
  RAW_ACC.forEach((r, i) => {
    const [accCat, name, species, presentation, price] = r;
    const label = ACC_CATS[accCat].label.toLowerCase();
    products.push({
      id: 'a' + (i + 1), group: 'acc', accCat, name, brand: '', species,
      stage: 'Todas las edades', category: 'accesorio', presentation, price,
      description: 'Accesorio de la categoría ' + label + (species === 'gato' ? ' para gatos' : '') + '.'
    });
  });
  const foods = products.filter((p) => p.group === 'food');
  const accessories = products.filter((p) => p.group === 'acc');
  const services = RAW_SERVICES.map((r, i) => ({ id: 's' + (i + 1), group: r[0], name: r[1], price: r[2], description: r[3], tags: r[4] }));

  const productMsg = (p) => {
    const pres = p.presentation && p.presentation !== 'Unidad' ? ' de ' + p.presentation : '';
    return 'Hola PETSLAND, estoy interesado en comprar ' + p.name + pres + ', que aparece en el catálogo por ' + fmtPrice(p.price) + '. ¿Me pueden confirmar disponibilidad?';
  };
  const serviceMsg = (s) => 'Hola, quiero información sobre el servicio de ' + s.name + ' de PETSLAND.';
  const lineOf = (p) => p.name + (p.presentation && p.presentation !== 'Unidad' ? ' ' + p.presentation : '') + ': ' + fmtPrice(p.price);

  function scrollToId(id) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
  }

  /* =====================================================
     MENÚ
     ===================================================== */
  const burger = $('#burger');
  const menu = $('#menu');
  function closeMenu() {
    menu.classList.remove('is-open');
    burger.setAttribute('aria-expanded', 'false');
    burger.setAttribute('aria-label', 'Abrir menú');
  }
  burger.addEventListener('click', () => {
    const open = menu.classList.toggle('is-open');
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
  });
  menu.addEventListener('click', (e) => { if (e.target.closest('a')) closeMenu(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeMenu(); });
  window.addEventListener('resize', () => { if (window.innerWidth > 1040) closeMenu(); });
  const yearEl = $('#year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* =====================================================
     TARJETAS DE PRODUCTO + MODAL
     ===================================================== */
  function cardHTML(p) {
    const emoji = p.group === 'acc' ? ACC_CATS[p.accCat].emoji : TYPE_EMOJI[p.category];
    const tag = p.group === 'acc' ? ACC_CATS[p.accCat].label : (p.brand || TYPE_LABEL[p.category]);
    const tags = [];
    if (p.species !== 'general') tags.push(SPECIES_LABEL[p.species]);
    if (p.category === 'seco' || p.category === 'humedo') tags.push(p.stage);
    tags.push(p.group === 'acc' ? ACC_CATS[p.accCat].label : TYPE_LABEL[p.category]);
    return '<article class="product-card">' +
      '<div class="product-visual"><span class="product-emoji" aria-hidden="true">' + emoji + '</span><span class="product-brandtag">' + esc(tag) + '</span></div>' +
      '<div class="product-body">' +
      '<h4>' + esc(p.name) + '</h4>' +
      '<div class="product-meta">' + tags.map((t) => '<span class="tag">' + esc(t) + '</span>').join('') + '</div>' +
      '<p class="product-pres">Presentación: ' + esc(p.presentation) + '</p>' +
      '<p class="price">' + fmtPrice(p.price) + '</p>' +
      '<div class="product-actions">' +
      '<button type="button" class="btn btn-outline btn-sm" data-detail="' + p.id + '">Ver detalles</button>' +
      '<a class="btn btn-primary btn-sm" href="' + waLink(productMsg(p)) + '" target="_blank" rel="noopener">Consultar por WhatsApp</a>' +
      '</div></div></article>';
  }

  const dlg = $('#product-dialog');
  function openProduct(id) {
    const p = products.find((x) => x.id === id);
    if (!p) return;
    $('#pd-brand').textContent = p.brand || (p.group === 'acc' ? ACC_CATS[p.accCat].label : TYPE_LABEL[p.category]);
    $('#pd-title').textContent = p.name;
    $('#pd-price').textContent = fmtPrice(p.price);
    $('#pd-desc').textContent = p.description;
    const meta = [];
    if (p.brand) meta.push(['Marca', p.brand]);
    meta.push(['Especie', p.species === 'general' ? 'Perros y gatos' : SPECIES_LABEL[p.species]]);
    if (p.category === 'seco' || p.category === 'humedo') meta.push(['Etapa', p.stage]);
    meta.push(['Presentación', p.presentation]);
    meta.push(['Categoría', p.group === 'acc' ? ACC_CATS[p.accCat].label : TYPE_LABEL[p.category]]);
    $('#pd-meta').innerHTML = meta.map((m) => '<dt>' + esc(m[0]) + '</dt><dd>' + esc(m[1]) + '</dd>').join('');
    $('#pd-wa').href = waLink(productMsg(p));
    if (typeof dlg.showModal === 'function') dlg.showModal(); else dlg.setAttribute('open', '');
  }
  function closeProduct() { if (typeof dlg.close === 'function') dlg.close(); else dlg.removeAttribute('open'); }
  $('#pd-close').addEventListener('click', closeProduct);
  dlg.addEventListener('click', (e) => { if (e.target === dlg) closeProduct(); });
  document.addEventListener('click', (e) => {
    const b = e.target.closest('[data-detail]');
    if (b) openProduct(b.getAttribute('data-detail'));
  });

  /* =====================================================
     CATÁLOGO DE ALIMENTOS (filtros, búsqueda, orden)
     ===================================================== */
  const PAGE_SIZE = 24;
  const defaults = { q: '', species: 'todos', stage: 'todas', type: 'todos', brand: 'todas', sort: 'default' };
  const state = Object.assign({}, defaults);
  let visible = PAGE_SIZE;

  const brandSelect = $('#f-brand');
  Array.from(new Set(foods.map((p) => p.brand).filter(Boolean))).sort((a, b) => a.localeCompare(b, 'es')).forEach((b) => {
    const o = document.createElement('option');
    o.value = b; o.textContent = b;
    brandSelect.appendChild(o);
  });

  function matchesQuery(p, q) {
    const tokens = norm(q).split(' ').filter(Boolean);
    if (!tokens.length) return true;
    const speciesWords = p.species === 'perro' ? 'perro perros' : p.species === 'gato' ? 'gato gatos' : '';
    const hay = norm([p.name, p.brand, speciesWords, TYPE_LABEL[p.category], p.stage, p.presentation].join(' '));
    return tokens.every((t) => hay.includes(t));
  }

  function filteredFoods() {
    let list = foods.filter((p) =>
      (state.species === 'todos' || p.species === state.species) &&
      (state.stage === 'todas' || p.stage === state.stage) &&
      (state.type === 'todos' || p.category === state.type) &&
      (state.brand === 'todas' || p.brand === state.brand) &&
      matchesQuery(p, state.q)
    );
    if (state.sort === 'price-asc') list = list.slice().sort((a, b) => a.price - b.price);
    else if (state.sort === 'price-desc') list = list.slice().sort((a, b) => b.price - a.price);
    else if (state.sort === 'name-asc') list = list.slice().sort((a, b) => a.name.localeCompare(b.name, 'es'));
    else if (state.sort === 'name-desc') list = list.slice().sort((a, b) => b.name.localeCompare(a.name, 'es'));
    return list;
  }

  function renderCatalog() {
    const list = filteredFoods();
    const grid = $('#food-grid');
    grid.innerHTML = list.slice(0, visible).map(cardHTML).join('');
    $('#result-count').textContent = list.length === 1 ? '1 producto' : list.length + ' productos';
    $('#food-empty').hidden = list.length !== 0;
    $('#food-more').hidden = list.length <= visible;
  }

  function syncControls() {
    $('#f-search').value = state.q;
    $$('#f-species .chip').forEach((c) => { const on = c.dataset.value === state.species; c.classList.toggle('is-on', on); c.setAttribute('aria-pressed', String(on)); });
    $$('#f-type .chip').forEach((c) => { const on = c.dataset.value === state.type; c.classList.toggle('is-on', on); c.setAttribute('aria-pressed', String(on)); });
    $('#f-stage').value = state.stage;
    $('#f-brand').value = state.brand;
    $('#f-sort').value = state.sort;
  }

  function applyFilters(partial, doScroll) {
    Object.assign(state, defaults, partial || {});
    visible = PAGE_SIZE;
    syncControls();
    renderCatalog();
    if (doScroll) scrollToId('catalogo');
  }

  $('#f-search').addEventListener('input', (e) => { state.q = e.target.value; visible = PAGE_SIZE; renderCatalog(); });
  $('#f-species').addEventListener('click', (e) => { const c = e.target.closest('.chip'); if (!c) return; state.species = c.dataset.value; visible = PAGE_SIZE; syncControls(); renderCatalog(); });
  $('#f-type').addEventListener('click', (e) => { const c = e.target.closest('.chip'); if (!c) return; state.type = c.dataset.value; visible = PAGE_SIZE; syncControls(); renderCatalog(); });
  $('#f-stage').addEventListener('change', (e) => { state.stage = e.target.value; visible = PAGE_SIZE; renderCatalog(); });
  $('#f-brand').addEventListener('change', (e) => { state.brand = e.target.value; visible = PAGE_SIZE; renderCatalog(); });
  $('#f-sort').addEventListener('change', (e) => { state.sort = e.target.value; renderCatalog(); });
  $('#f-reset').addEventListener('click', () => applyFilters({}, false));
  $('#empty-reset').addEventListener('click', () => applyFilters({}, false));
  $('#food-more').addEventListener('click', () => { visible += PAGE_SIZE; renderCatalog(); });
  $('#food-tiles').addEventListener('click', (e) => {
    const t = e.target.closest('.tile');
    if (!t) return;
    const f = {};
    if (t.dataset.species) f.species = t.dataset.species;
    if (t.dataset.type) f.type = t.dataset.type;
    applyFilters(f, true);
  });

  /* =====================================================
     ACCESORIOS
     ===================================================== */
  let accFilter = 'todos';
  function renderAccChips() {
    const wrap = $('#acc-chips');
    const items = [['todos', 'Todos']].concat(Object.keys(ACC_CATS).map((k) => [k, ACC_CATS[k].label]));
    wrap.innerHTML = items.map((it) => '<button type="button" class="chip' + (it[0] === accFilter ? ' is-on' : '') + '" data-value="' + it[0] + '" aria-pressed="' + (it[0] === accFilter) + '">' + esc(it[1]) + '</button>').join('');
  }
  function renderAccessories() {
    const list = accessories.filter((p) => accFilter === 'todos' || p.accCat === accFilter);
    $('#productos-accesorios').innerHTML = list.map(cardHTML).join('');
  }
  function setAccFilter(key) { accFilter = key; renderAccChips(); renderAccessories(); }
  $('#acc-chips').addEventListener('click', (e) => { const c = e.target.closest('.chip'); if (c) setAccFilter(c.dataset.value); });

  /* =====================================================
     SERVICIOS
     ===================================================== */
  let serviceTab = 'consulta';
  function renderServiceTabs() {
    $('#service-tabs').innerHTML = Object.keys(SERVICE_GROUPS).map((k) =>
      '<button type="button" class="tab" role="tab" data-group="' + k + '" aria-selected="' + (k === serviceTab) + '">' + esc(SERVICE_GROUPS[k]) + '</button>').join('');
  }
  function renderServices() {
    $('#service-grid').innerHTML = services.filter((s) => s.group === serviceTab).map((s) =>
      '<article class="service-card"><h4>' + esc(s.name) + '</h4><p>' + esc(s.description) + '</p>' +
      '<p class="price">' + fmtPrice(s.price) + '</p>' +
      '<div class="card-actions">' +
      '<button type="button" class="btn btn-outline btn-sm" data-info="' + s.id + '">Solicitar información</button>' +
      '<a class="btn btn-primary btn-sm" href="' + waLink(serviceMsg(s)) + '" target="_blank" rel="noopener">WhatsApp</a>' +
      '</div></article>').join('');
  }
  function selectServiceGroup(key) {
    if (!SERVICE_GROUPS[key]) return;
    serviceTab = key;
    renderServiceTabs();
    renderServices();
  }
  $('#service-tabs').addEventListener('click', (e) => { const t = e.target.closest('.tab'); if (t) selectServiceGroup(t.dataset.group); });
  document.addEventListener('click', (e) => {
    const link = e.target.closest('[data-service-tab]');
    if (link) selectServiceGroup(link.getAttribute('data-service-tab'));
    const info = e.target.closest('[data-info]');
    if (info) {
      const s = services.find((x) => x.id === info.getAttribute('data-info'));
      if (!s) return;
      $('#c-motivo').value = 'Información sobre un servicio';
      $('#c-mensaje').value = 'Quiero información sobre el servicio de ' + s.name + '.';
      scrollToId('contacto');
      setTimeout(() => $('#c-nombre').focus({ preventScroll: true }), 500);
    }
  });

  /* =====================================================
     FORMULARIO → WHATSAPP
     ===================================================== */
  const form = $('#contact-form');
  function setErr(field, msg) {
    const input = $('#c-' + field);
    const err = $('#err-' + field);
    err.textContent = msg || '';
    input.closest('.form-field').classList.toggle('has-error', !!msg);
    input.setAttribute('aria-invalid', msg ? 'true' : 'false');
    return !msg;
  }
  function validateForm() {
    const v = (id) => $('#c-' + id).value.trim();
    const digits = v('tel').replace(/\D/g, '');
    const results = [
      setErr('nombre', v('nombre').length < 2 ? 'Escribe tu nombre.' : ''),
      setErr('tel', digits.length < 7 || digits.length > 15 ? 'Escribe un teléfono válido, solo con números.' : ''),
      setErr('mascota', v('mascota').length < 1 ? 'Escribe el nombre de tu mascota.' : ''),
      setErr('especie', !v('especie') ? 'Selecciona la especie.' : ''),
      setErr('motivo', !v('motivo') ? 'Selecciona el motivo de contacto.' : ''),
      setErr('mensaje', v('mensaje').length < 3 ? 'Escribe tu mensaje.' : '')
    ];
    return results.every(Boolean);
  }
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const status = $('#form-status');
    if (!validateForm()) {
      status.textContent = 'Revisa los campos marcados.';
      const first = $('.has-error input, .has-error select, .has-error textarea', form);
      if (first) first.focus();
      return;
    }
    const v = (id) => $('#c-' + id).value.trim();
    const text = 'Hola PETSLAND, quiero solicitar información.\n\n' +
      'Nombre: ' + v('nombre') + '\nTeléfono: ' + v('tel') + '\nMascota: ' + v('mascota') +
      '\nEspecie: ' + v('especie') + '\nMotivo: ' + v('motivo') + '\nMensaje: ' + v('mensaje');
    const url = waLink(text);
    window.open(url, '_blank', 'noopener');
    status.innerHTML = 'Se abrió WhatsApp con tu mensaje. Tu solicitud queda pendiente hasta que PETSLAND te responda. Si no se abrió, <a href="' + url + '" target="_blank" rel="noopener">usa este enlace</a>.';
  });

  /* =====================================================
     CHATBOT
     ===================================================== */
  const chatFab = $('#chat-fab');
  const chatWin = $('#chat-window');
  const chatLog = $('#chat-log');
  const chatInput = $('#chat-input');
  const chatForm = $('#chat-form');
  const STORE_KEY = 'petsland-chat-v1';

  let history = [];
  let ctx = { brands: [], species: null, acc: null, groups: [], pending: null };

  function loadChat() {
    try {
      const raw = sessionStorage.getItem(STORE_KEY);
      if (raw) { const d = JSON.parse(raw); history = d.history || []; ctx = Object.assign(ctx, d.ctx || {}); }
    } catch (err) { /* sin persistencia */ }
  }
  function saveChat() {
    try { sessionStorage.setItem(STORE_KEY, JSON.stringify({ history, ctx })); } catch (err) { /* sin persistencia */ }
  }

  function linkify(text) {
    return esc(text)
      .replace(/Andrea\.mendoza8412@gmail\.com/gi, '<a href="mailto:' + contactInfo.email + '">$&</a>')
      .replace(/320 ?3193564/g, '<a href="' + contactInfo.wa + '" target="_blank" rel="noopener">$&</a>')
      .replace(/@petsland_26/g, '<a href="' + contactInfo.igUrl + '" target="_blank" rel="noopener">$&</a>');
  }

  /* ---- Constructores de botones ---- */
  const B = {
    wa: (label, msg) => ({ label: label || '💬 Abrir WhatsApp', type: 'link', href: waLink(msg), wa: true }),
    mail: () => ({ label: '📧 Enviar correo', type: 'link', href: 'mailto:' + contactInfo.email }),
    ig: () => ({ label: '📸 Abrir Instagram', type: 'link', href: contactInfo.igUrl }),
    nav: (label, id) => ({ label, type: 'nav', value: id }),
    send: (label, text) => ({ label, type: 'send', value: text || label }),
    filter: (label, f) => ({ label, type: 'filter', value: f }),
    acc: (label, key) => ({ label, type: 'acc', value: key }),
    svc: (label, key) => ({ label, type: 'svc', value: key })
  };
  const P = (text, lines, buttons) => ({ text, lines: lines || [], buttons: buttons || [] });

  const contactButtons = () => [B.wa(), B.mail(), B.ig()];

  const QUICK_MAIN = [
    B.send('🐶 Alimentos para perros', 'Muéstrame comida para perros'),
    B.send('🐱 Alimentos para gatos', 'Muéstrame comida para gatos'),
    B.send('🛍️ Accesorios', 'Muéstrame accesorios'),
    B.send('✂️ Baño y peluquería', '¿Cuánto cuesta el baño y la peluquería?'),
    B.send('🩺 Servicios veterinarios', '¿Qué servicios veterinarios tienen?'),
    B.send('💰 Ver precios', 'Ver precios'),
    B.send('📍 Ubicación', '¿Dónde están?'),
    B.send('📱 Contactar PETSLAND', 'Quiero hablar con PETSLAND'),
    B.send('📧 Correo', '¿Cuál es el correo?'),
    B.send('📸 Instagram', '¿Cuál es el Instagram?')
  ];
  const QUICK_STRIP = [
    B.nav('Ver catálogo', 'catalogo'),
    B.send('Alimentos para perros', 'Muéstrame comida para perros'),
    B.send('Alimentos para gatos', 'Muéstrame comida para gatos'),
    B.send('Accesorios', 'Muéstrame accesorios'),
    B.send('Servicios', '¿Qué servicios tienen?'),
    B.send('Ver precios', 'Ver precios'),
    B.wa('WhatsApp'),
    { label: 'Correo', type: 'link', href: 'mailto:' + contactInfo.email },
    { label: 'Instagram', type: 'link', href: contactInfo.igUrl }
  ];

  /* ---- Render ---- */
  function renderButton(b, container) {
    let el;
    if (b.type === 'link') {
      el = document.createElement('a');
      el.href = b.href;
      if (b.href.indexOf('mailto:') !== 0) { el.target = '_blank'; el.rel = 'noopener'; }
    } else {
      el = document.createElement('button');
      el.type = 'button';
      el.addEventListener('click', () => runButton(b));
    }
    el.className = 'msg-btn' + (b.wa ? ' is-wa' : '');
    el.textContent = b.label;
    container.appendChild(el);
  }

  function renderMessage(item) {
    const div = document.createElement('div');
    if (item.from === 'user') {
      div.className = 'msg msg-user';
      div.textContent = item.text;
    } else {
      div.className = 'msg msg-bot';
      const pl = item.payload;
      if (pl.text) { const p = document.createElement('p'); p.innerHTML = linkify(pl.text); div.appendChild(p); }
      if (pl.lines && pl.lines.length) {
        const ul = document.createElement('ul'); ul.className = 'msg-list';
        pl.lines.forEach((l) => { const li = document.createElement('li'); li.innerHTML = linkify(l); ul.appendChild(li); });
        div.appendChild(ul);
      }
      if (pl.after) { const p2 = document.createElement('p'); p2.innerHTML = linkify(pl.after); div.appendChild(p2); }
      if (pl.buttons && pl.buttons.length) {
        const row = document.createElement('div'); row.className = 'msg-buttons';
        pl.buttons.forEach((b) => renderButton(b, row));
        div.appendChild(row);
      }
    }
    chatLog.appendChild(div);
    chatLog.scrollTop = chatLog.scrollHeight;
    return div;
  }

  function pushMessage(item) {
    history.push(item);
    if (history.length > 60) history = history.slice(-60);
    saveChat();
    return renderMessage(item);
  }

  function closeChatOnMobile() { if (window.innerWidth <= 760) setChatOpen(false); }

  function runButton(b) {
    if (b.type === 'send') { handleUserText(b.value); return; }
    if (b.type === 'nav') { closeChatOnMobile(); scrollToId(b.value); return; }
    if (b.type === 'filter') { closeChatOnMobile(); applyFilters(b.value, true); return; }
    if (b.type === 'acc') { closeChatOnMobile(); setAccFilter(b.value); scrollToId('productos-accesorios'); return; }
    if (b.type === 'svc') { closeChatOnMobile(); selectServiceGroup(b.value); scrollToId('servicios'); }
  }

  function setChatOpen(open) {
    chatWin.hidden = !open;
    chatFab.setAttribute('aria-expanded', String(open));
    if (open) {
      if (!history.length) startConversation();
      else if (!chatLog.children.length) history.forEach(renderMessage);
      chatLog.scrollTop = chatLog.scrollHeight;
      setTimeout(() => chatInput.focus(), 50);
    }
  }

  function startConversation() {
    pushMessage({ from: 'bot', payload: P('¡Hola! 🐾 Soy el asistente virtual de PETSLAND. Puedo ayudarte a encontrar alimentos, consultar precios, conocer nuestros servicios, ver accesorios, conocer nuestros datos de contacto o ayudarte a comunicarte con PETSLAND.') });
    pushMessage({ from: 'bot', payload: P('¿Qué necesitas?', [], QUICK_MAIN) });
  }

  /* =====================================================
     MOTOR DE RESPUESTAS
     ===================================================== */
  const BRANDS = [
    ['Monello', ['monello']],
    ['Cat Chow', ['cat chow', 'catchow']],
    ['Dog Chow', ['dog chow', 'dogchow']],
    ['Chunky', ['chunky']],
    ['Pedigree', ['pedigree']],
    ['Ringo', ['ringo']],
    ['Dogourmet', ['dogourmet', 'dogurmet']],
    ['Max', ['max']],
    ['Purina One', ['purina one', 'purina']],
    ['Pro Plan', ['pro plan', 'proplan']],
    ['Royal Canin', ['royal canin', 'royal']],
    ['Taste of the Wild', ['taste of the wild', 'taste', 'wild']],
    ['Mirringo', ['mirringo']],
    ['Whiskas', ['whiskas', 'wiskas']],
    ['Felix', ['felix']],
    ['Agility Gold', ['agility gold', 'agility']],
    ['BR For Cat', ['br for cat', 'brforcat']],
    ['Donkat', ['donkat']],
    ['King Cat', ['king cat', 'kingcat']]
  ];
  const ACC_RE = [
    ['correas', /\b(correa|correas|trailla|traillas)\b/],
    ['collares', /\b(collar|collares)\b/],
    ['pecheras', /\b(pechera|pecheras|arnes|arneses)\b/],
    ['panoletas', /\b(panoleta|panoletas|bandana|bandanas)\b/],
    ['juguetes', /\b(juguete|juguetes|pelota|pelotas|mordedor|mordedores)\b/],
    ['camas', /\b(cama|camas)\b/],
    ['comederos', /\b(comedero|comederos)\b/],
    ['bebederos', /\b(bebedero|bebederos)\b/],
    ['transportadores', /\b(transportador|transportadores)\b/]
  ];
  const SERVICE_RE = [
    ['consulta', /\b(consulta|consultas|valoracion|orientacion)\b/],
    ['higiene', /\b(bano|banos|banar|banarlo|banarla|higiene|unas|oidos|cepillado|cepillar)\b/],
    ['peluqueria', /\b(peluqueria|peluquear|corte|cortar|deslanado|deslanar|estetica)\b/],
    ['prevencion', /\b(desparasit\w*|vacun\w*|prevencion)\b/],
    ['medicos', /\b(esterilizacion|esterilizar|esterilizarlo|esterilizarla|castracion|castrar|profilaxis|radiograf\w*|ecograf\w*|hemograma|hospitaliz\w*|hospital|urgencia\w*|cirugia)\b/]
  ];
  const RE = {
    price: /\b(cuanto|cuanta|cuesta|cuestan|precio|precios|vale|valen|valor|costo|costos|tarifa|tarifas|cobran|a como)\b/,
    have: /\b(tienen|tiene|hay|venden|manejan|disponible|disponibles)\b/,
    buy: /\b(comprar|compro|pedir|llevar|necesito|quiero)\b/,
    show: /\b(muestrame|mostrar|muestra|ensename|ver|catalogo)\b/
  };

  function findBrands(n) {
    const found = [];
    let rest = n;
    BRANDS.forEach((b) => {
      const sorted = b[1].slice().sort((x, y) => y.length - x.length);
      for (const a of sorted) {
        const re = new RegExp('(^|[^a-z0-9])' + a.replace(/ /g, '\\s+') + '(?![a-z0-9])');
        if (re.test(rest)) {
          found.push(b[0]);
          rest = rest.replace(new RegExp(a.replace(/ /g, '\\s+'), 'g'), ' ');
          break;
        }
      }
    });
    return { brands: found, rest: rest };
  }

  function detectSpecies(n) {
    if (/\b(perro|perros|perrito|perritos|perrita|canino|caninos)\b/.test(n)) return 'perro';
    if (/\b(gato|gatos|gata|gatas|gatito|gatitos|gatita|felino|felinos)\b/.test(n)) return 'gato';
    return null;
  }
  function detectStage(n) {
    if (/\b(cachorro|cachorros|puppy|kitten|gatito|gatitos|gatita|bebe)\b/.test(n)) return 'Cachorro';
    if (/\b(senior|mayor|mayores|viejito|viejo|anciano)\b/.test(n)) return 'Senior';
    if (/\b(adulto|adultos|adult)\b/.test(n)) return 'Adulto';
    return null;
  }
  function detectType(n) {
    if (/\b(arena|arenas|sanitaria)\b/.test(n)) return 'arena';
    if (/\b(humedo|humedos|lata|latas|pate|sobre|sobres)\b/.test(n)) return 'humedo';
    if (/\b(snack|snacks|premio|premios|galleta|galletas|hueso|huesos|oreja|orejas|golosina|golosinas)\b/.test(n)) return 'snack';
    if (/\b(seco|secos|croqueta|croquetas|concentrado|concentrados)\b/.test(n)) return 'seco';
    return null;
  }

  function minPrice(list) { return Math.min.apply(null, list.map((p) => p.price)); }
  function uniq(arr) { return Array.from(new Set(arr)); }
  function speciesPlural(s) { return s === 'perro' ? 'perros' : 'gatos'; }

  function foodList(o) {
    return foods.filter((p) =>
      (!o.brands || !o.brands.length || o.brands.indexOf(p.brand) !== -1) &&
      (!o.species || p.species === o.species) &&
      (!o.stage || p.stage === o.stage) &&
      (!o.type || p.category === o.type) &&
      (!o.sterile || /esteriliz|castrad/.test(norm(p.name)))
    );
  }

  function listLines(list, max) {
    max = max || 12;
    const lines = list.slice(0, max).map(lineOf);
    return { lines, extra: Math.max(0, list.length - max) };
  }
  function brandSummaryLines(list) {
    return uniq(list.map((p) => p.brand || TYPE_LABEL[p.category])).map((b) => {
      const items = list.filter((p) => (p.brand || TYPE_LABEL[p.category]) === b);
      return b + ': desde ' + fmtPrice(minPrice(items)) + (items.length > 1 ? ' (' + items.length + ' productos)' : '');
    });
  }

  function filterButtonFor(o, label) {
    const f = {};
    if (o.species) f.species = o.species;
    if (o.type) f.type = o.type;
    if (o.stage) f.stage = o.stage;
    if (o.brands && o.brands.length === 1) f.brand = o.brands[0];
    return B.filter(label, f);
  }

  function remember(o) {
    if (o.brands) ctx.brands = o.brands;
    if (o.species !== undefined) ctx.species = o.species;
    ctx.acc = o.acc !== undefined ? o.acc : ctx.acc;
    if (o.groups) ctx.groups = o.groups;
    ctx.pending = o.pending || null;
  }

  /* ---- Respuestas por tema ---- */
  function answerBrand(brands, species, stage, type, sterile, intent, restN) {
    let list = foodList({ brands, species, stage, type, sterile });
    if (restN && list.length > 1) {
      const w = restN.match(/(\d+(?:,\d+)?)\s?(kg|g)\b/);
      if (w) {
        const wre = new RegExp('(^|\\s)' + w[1].replace(',', ',') + ' ' + w[2] + '(\\s|$)');
        const byW = list.filter((p) => wre.test(norm(p.presentation)));
        if (byW.length) list = byW;
      }
    }
    if (restN && list.length > 1) {
      const extra = restN.split(' ').filter((t) => t.length >= 3 && STOP.indexOf(t) === -1);
      if (extra.length) {
        const narrowed = list.filter((p) => { const hay = norm(p.name + ' ' + p.presentation); return extra.every((t) => hay.includes(t)); });
        if (narrowed.length) list = narrowed;
      }
    }
    const brandText = brands.join(' y ');
    if (!list.length) {
      remember({ brands, species, acc: null, groups: [] });
      const sp = species ? ' para ' + speciesPlural(species) : '';
      return P('No encuentro ' + brandText + sp + ' en el catálogo actual de PETSLAND. Puedes consultar directamente por WhatsApp para confirmar si está disponible.', [],
        [B.wa('💬 Consultar por WhatsApp', 'Hola PETSLAND, quiero consultar si tienen ' + brandText + sp + '.'), B.send('Ver qué tenemos', species === 'perro' ? 'Muéstrame comida para perros' : species === 'gato' ? 'Muéstrame comida para gatos' : '¿Qué comida tienen?')]);
    }
    const speciesSet = uniq(list.map((p) => p.species));
    if (!species && speciesSet.length > 1 && (intent === 'price' || intent === 'buy')) {
      remember({ brands, species: null, acc: null, groups: [], pending: { type: 'species' } });
      return P(brandText + ' aparece en el catálogo para perros y para gatos. ¿Para cuál lo buscas?', [],
        [B.send('🐶 Para perro', brandText + ' para perro'), B.send('🐱 Para gato', brandText + ' para gato')]);
    }
    remember({ brands, species: species || (speciesSet.length === 1 ? speciesSet[0] : null), acc: null, groups: [] });
    if (!species && speciesSet.length > 1 && intent === 'have') {
      const lines = speciesSet.map((s) => {
        const items = list.filter((p) => p.species === s);
        return (s === 'perro' ? 'Perros' : 'Gatos') + ': ' + items.length + (items.length === 1 ? ' producto' : ' productos') + ', desde ' + fmtPrice(minPrice(items));
      });
      return P(brandText + ' aparece en nuestro catálogo.', lines, [B.send('🐶 Precios para perro', brandText + ' para perro'), B.send('🐱 Precios para gato', brandText + ' para gato')]);
    }
    const sp = species ? ' para ' + speciesPlural(species) : '';
    const r = listLines(list, 14);
    let text;
    if (intent === 'buy') text = 'Claro. 🐾 Esto es lo que aparece en el catálogo de ' + brandText + sp + ':';
    else if (intent === 'have') text = brandText + sp + ' aparece en nuestro catálogo:';
    else text = 'Estos son los precios de ' + brandText + sp + ':';
    const lines = r.lines.slice();
    if (r.extra) lines.push('…y ' + r.extra + ' más en el catálogo.');
    const buttons = [filterButtonFor({ species, stage, type, brands }, 'Ver en el catálogo')];
    if (list.length === 1) buttons.push(B.wa('💬 Consultar por WhatsApp', productMsg(list[0])));
    else buttons.push(B.wa('💬 Consultar disponibilidad', 'Hola PETSLAND, quiero consultar disponibilidad de ' + brandText + sp + '.'));
    const pl = P(text, lines, buttons);
    pl.after = 'El producto aparece en nuestro catálogo. Para confirmar disponibilidad actual puedes escribir a PETSLAND.';
    return pl;
  }

  function answerFood(species, stage, type, sterile, intent) {
    const list = foodList({ species, stage, type, sterile });
    if (!list.length) {
      return P('No encuentro productos con esas características en el catálogo actual de PETSLAND. Puedes consultar directamente por WhatsApp.', [], [B.wa(), B.send('Ver todo el catálogo', 'Quiero ver el catálogo')]);
    }
    remember({ brands: [], species, acc: null, groups: [] });
    const what = [];
    if (type) what.push({ seco: 'alimento seco', humedo: 'alimento húmedo', snack: 'snacks', arena: 'arena sanitaria' }[type]);
    else what.push('alimentos');
    if (species) what.push('para ' + speciesPlural(species));
    if (sterile) what.push('esterilizados');
    if (stage) what.push('(etapa ' + stage.toLowerCase() + ')');
    const intro = 'Tenemos ' + what.join(' ') + ' en el catálogo';
    let lines, text;
    if (list.length <= 12) {
      lines = list.map(lineOf);
      text = intro + ':';
    } else {
      lines = brandSummaryLines(list);
      text = intro + '. Estas son las marcas y precios desde:';
    }
    const label = species === 'gato' ? 'Ver alimentos para gatos' : species === 'perro' ? 'Ver alimentos para perros' : 'Ver en el catálogo';
    const buttons = [filterButtonFor({ species, stage, type }, label)];
    if (!species) buttons.push(B.send('🐶 Para perros', 'Muéstrame comida para perros'), B.send('🐱 Para gatos', 'Muéstrame comida para gatos'));
    buttons.push(B.wa());
    const pl = P(text, lines, buttons);
    pl.after = 'Si quieres, puedo mostrarte el catálogo completo.';
    return pl;
  }

  function answerAccessory(key, species, intent, rawN) {
    let list = accessories.filter((p) => p.accCat === key);
    if (species === 'gato') { const g = list.filter((p) => p.species === 'gato'); if (g.length) list = g; }
    remember({ brands: [], species: species || null, acc: key, groups: [] });
    const label = ACC_CATS[key].label.toLowerCase();
    const buttons = [B.acc('Ver ' + label + ' en la página', key)];
    if (intent === 'price' && !/\b(que|cuales|opciones|tipos)\b/.test(rawN || '')) {
      return P('Tenemos ' + label + ' desde ' + fmtPrice(minPrice(list)) + '. 🐾', [], buttons.concat([B.send('Ver todas las opciones', '¿Qué ' + label + ' tienen?'), B.wa('💬 Consultar por WhatsApp', 'Hola PETSLAND, quiero información sobre ' + label + ' del catálogo.')]));
    }
    const pl = P('Tenemos varias opciones de ' + label + ':', list.map(lineOf), buttons.concat([B.wa('💬 Consultar por WhatsApp', 'Hola PETSLAND, quiero información sobre ' + label + ' del catálogo.')]));
    pl.after = 'Para confirmar disponibilidad actual puedes escribir a PETSLAND.';
    return pl;
  }

  function accessoryOverview() {
    remember({ brands: [], species: null, acc: null, groups: [] });
    const lines = Object.keys(ACC_CATS).map((k) => {
      const items = accessories.filter((p) => p.accCat === k);
      return ACC_CATS[k].label + ': desde ' + fmtPrice(minPrice(items));
    });
    return P('En accesorios tenemos estas categorías:', lines, [
      B.nav('Ver accesorios en la página', 'productos-accesorios'),
      B.send('Correas', '¿Qué correas tienen?'), B.send('Collares', '¿Qué collares tienen?'),
      B.send('Pecheras', '¿Qué pecheras tienen?'), B.send('Pañoletas', '¿Qué pañoletas tienen?'),
      B.send('Camas', '¿Qué camas tienen?'), B.send('Juguetes', '¿Qué juguetes tienen?')
    ]);
  }

  function serviceModifiers(n) {
    const m = [];
    if (/\b(pequeno|pequena|pequenos|chico|chica|mini|toy)\b/.test(n)) m.push('pequeno');
    if (/\b(mediano|mediana|medianos)\b/.test(n)) m.push('mediano');
    if (/\bextra grande\b|\bxl\b|\bgigante\b/.test(n)) m.push('extra');
    else if (/\b(grande|grandes)\b/.test(n)) m.push('grande');
    if (/\b(gato|gatos|gata|gatas|gatito|gatita)\b/.test(n)) m.push('gato');
    if (/\bunas\b/.test(n)) m.push('unas');
    if (/\boidos\b/.test(n)) m.push('oidos');
    if (/\bcepill\w*/.test(n)) m.push('cepillado');
    if (/\bdeslan\w*/.test(n)) m.push('deslanado');
    if (/corte higienico/.test(n)) m.push('corte-higienico');
    if (/\bconsulta de control\b|\bcontrol veterinario\b/.test(n)) m.push('control');
    if (/\bvaloracion\b/.test(n)) m.push('valoracion');
    if (/\borientacion\b/.test(n)) m.push('orientacion');
    if (/\besterilizacion\b|\besterilizar\w*|\bcastracion\b|\bcastrar\b/.test(n)) m.push('esterilizacion');
    if (/\bprofilaxis\b|\blimpieza dental\b/.test(n)) m.push('profilaxis');
    if (/\bradiograf\w*/.test(n)) m.push('radiografia');
    if (/\becograf\w*/.test(n)) m.push('ecografia');
    if (/\bhemograma\b/.test(n)) m.push('hemograma');
    if (/\bhospitaliz\w*|\bhospital\b/.test(n)) m.push('hospitalizacion');
    if (/\burgencia\w*/.test(n)) m.push('urgencia');
    if (/\bdesparasit\w*/.test(n)) m.push('desparasitacion');
    if (/\bvacun\w*/.test(n)) m.push('vacunacion');
    return m;
  }

  function answerServices(groups, n) {
    let cand = services.filter((s) => groups.indexOf(s.group) !== -1);
    const mods = serviceModifiers(n);
    // combinación baño + peluquería: mostrar ambos grupos completos
    const onlyGroupWords = !mods.length || (groups.length > 1 && mods.every((x) => x === 'bano'));
    if (mods.length && !onlyGroupWords) {
      const narrowed = cand.filter((s) => mods.every((m) => s.tags.indexOf(m) !== -1));
      if (narrowed.length) cand = narrowed;
      else {
        const loose = cand.filter((s) => mods.some((m) => s.tags.indexOf(m) !== -1 && m !== 'perro'));
        if (loose.length) cand = loose;
      }
    }
    remember({ brands: [], species: null, acc: null, groups });
    const names = groups.map((g) => SERVICE_GROUPS[g].toLowerCase()).join(' y ');
    const lines = cand.map((s) => s.name + ': ' + fmtPrice(s.price));
    const btns = groups.length === 1 ? [B.svc('Ver servicios en la página', groups[0])] : [B.nav('Ver servicios en la página', 'servicios')];
    btns.push(B.wa('💬 Agendar por WhatsApp', 'Hola PETSLAND, quiero información sobre ' + (cand.length === 1 ? 'el servicio de ' + cand[0].name : 'los servicios de ' + names) + '.'));
    const pl = P('Estos son los precios de ' + names + ':', lines, btns);
    pl.after = 'Si quieres solicitar el servicio, puedes comunicarte directamente con PETSLAND.';
    return pl;
  }

  function serviceOverview(groupKeys) {
    const keys = groupKeys || Object.keys(SERVICE_GROUPS);
    remember({ brands: [], species: null, acc: null, groups: keys });
    const lines = keys.map((k) => {
      const items = services.filter((s) => s.group === k);
      return SERVICE_GROUPS[k] + ': desde ' + fmtPrice(minPrice(items)) + ' (' + items.length + ' servicios)';
    });
    const buttons = keys.map((k) => B.send(SERVICE_GROUPS[k], '¿Cuánto cuesta ' + SERVICE_GROUPS[k].toLowerCase() + '?'));
    buttons.push(B.nav('Ver todos los servicios', 'servicios'));
    return P('Estos son los servicios del catálogo de PETSLAND:', lines, buttons);
  }

  function pricesMenu() {
    return P('¿Qué precios quieres ver?', [], [
      B.send('✂️ Servicios', '¿Qué servicios tienen?'),
      B.send('🐶 Comida para perros', 'Muéstrame comida para perros'),
      B.send('🐱 Comida para gatos', 'Muéstrame comida para gatos'),
      B.send('🛍️ Accesorios', 'Muéstrame accesorios'),
      B.send('💸 Más económicos', 'Muéstrame productos baratos')
    ]);
  }

  function cheapest() {
    const list = products.slice().sort((a, b) => a.price - b.price).slice(0, 10);
    return P('Estos son los productos más económicos del catálogo:', list.map(lineOf), [B.nav('Ver catálogo', 'catalogo'), B.nav('Ver accesorios', 'productos-accesorios'), B.wa()]);
  }

  function contactAnswer(intro) {
    return P(intro || 'Puedes contactar a PETSLAND directamente:', ['📱 ' + contactInfo.phone, '📧 ' + contactInfo.email, '📸 ' + contactInfo.ig], contactButtons());
  }

  function fallbackAnswer() {
    return P('No tengo información suficiente para responder eso con seguridad. Para confirmarlo directamente con PETSLAND puedes escribir al WhatsApp ' + contactInfo.phone + '.', [], [B.wa(), B.mail(), B.send('Ver opciones', '¿Qué necesitas?')]);
  }

  const STOP = ['hola', 'quiero', 'tienen', 'tiene', 'cuanto', 'cuesta', 'cuestan', 'precio', 'precios', 'para', 'una', 'uno', 'unos', 'unas', 'que', 'con', 'por', 'los', 'las', 'del', 'como', 'mas', 'muy', 'son', 'hay', 'venden', 'favor', 'me', 'mi', 'su', 'sus', 'de', 'la', 'el', 'en', 'y', 'a', 'un', 'ver', 'muestrame', 'busco', 'necesito', 'comprar', 'valor', 'vale', 'cual', 'cuales', 'esta', 'este', 'cuanta', 'precios', 'tengan', 'gato', 'gatos', 'perro', 'perros', 'gata', 'gatito', 'gatitos', 'cachorro', 'cachorros', 'adulto', 'adultos', 'como', 'cual'];

  function tokenSearch(n) {
    const tokens = n.split(' ').filter((t) => t.length >= 3 && STOP.indexOf(t) === -1);
    if (!tokens.length) return [];
    let best = 0;
    const scored = products.map((p) => {
      const hay = norm([p.name, p.brand, p.presentation, TYPE_LABEL[p.category], p.stage].join(' '));
      const score = tokens.filter((t) => hay.includes(t)).length;
      if (score > best) best = score;
      return { p, score };
    });
    if (!best) return [];
    return scored.filter((s) => s.score === best).map((s) => s.p);
  }

  /* ---- Orquestador ---- */
  function respond(raw) {
    const n = norm(raw);
    if (!n) return P('Escríbeme tu pregunta y con gusto te ayudo. 🐾', [], QUICK_MAIN.slice(0, 4));

    // Mensajes ofensivos
    if (/\b(idiota|estupid[oa]s?|imbecil|mierda|puta|puto|pendejo|pendeja|hijueputa|gonorrea|malparid[oa]|marica|basura|inutil)\b/.test(n)) {
      return P('No puedo ayudarte con mensajes ofensivos. Si tienes una pregunta sobre PETSLAND, sus productos, servicios o precios, estaré encantado de ayudarte.');
    }

    // Salud: no diagnosticar ni recetar
    if (/\b(vomit\w*|diarrea|enfermedad|enfermo|enferma|sintoma\w*|medicament\w*|pastilla\w*|dosis|inyeccion|parvo\w*|moquillo|sangr\w*|convuls\w*|cojea|diagnostic\w*|receta\w*|antibiotic\w*|fiebre|tos|gripa|envenen\w*)\b/.test(n) || /\bno (quiere )?come\b/.test(n)) {
      return P('No puedo diagnosticar a una mascota mediante el chatbot. Lo más adecuado es consultar con un profesional veterinario. Puedes comunicarte con PETSLAND por WhatsApp al ' + contactInfo.phone + '.', [],
        [B.wa('💬 Abrir WhatsApp', 'Hola PETSLAND, quiero consultar por mi mascota.'), B.mail(), B.svc('Ver precios de consulta', 'consulta')]);
    }

    const brandInfo = findBrands(n);
    const brands = brandInfo.brands;
    const species = detectSpecies(brandInfo.rest);
    const stage = detectStage(brandInfo.rest);
    const type = detectType(n);
    const sterile = /\b(esterilizad[oa]s?|castrad[oa]s?)\b/.test(n) && !/\b(esterilizacion|cirugia)\b/.test(n);
    let accKey = null;
    ACC_RE.forEach((a) => { if (!accKey && a[1].test(n)) accKey = a[0]; });
    const groups = SERVICE_RE.filter((g) => g[1].test(n)).map((g) => g[0]);
    const intent = RE.price.test(n) ? 'price' : RE.have.test(n) ? 'have' : RE.buy.test(n) ? 'buy' : RE.show.test(n) ? 'show' : null;
    const hasProductEntity = brands.length || accKey || type || stage;
    const wordCount = n.split(' ').length;

    // Respuesta pendiente (¿perro o gato?)
    if (ctx.pending && ctx.pending.type === 'species' && species && !brands.length && !accKey && !groups.length && ctx.brands.length) {
      return answerBrand(ctx.brands, species, null, null, false, 'price');
    }

    // Gracias / despedida / saludo
    if (/^(muchas )?gracias\b|^listo\b|^perfecto\b|^ok\b|^vale gracias/.test(n) && wordCount <= 5) return P('¡Con gusto! 🐾 Si necesitas algo más sobre PETSLAND, aquí estoy.');
    if (/^(adios|chao|hasta luego|nos vemos)\b/.test(n)) return P('¡Hasta pronto! 🐾 Cuando quieras, aquí estaré para ayudarte.');
    if (/^(hola|holi|buenas|buenos dias|buen dia|buenas tardes|buenas noches|hey|saludos)\b/.test(n) && wordCount <= 4 && !hasProductEntity) {
      return P('¡Hola! 🐾 ¿En qué puedo ayudarte?', [], QUICK_MAIN.slice(0, 6));
    }

    // Agendar cita
    if (/\b(agendar|agenda|cita|citas|turno|reservar|reserva|apartar)\b/.test(n)) {
      const pl = P('¡Claro! 🐾 Para solicitar tu cita puedes comunicarte directamente con PETSLAND por WhatsApp. Te dejo el número para que puedas abrir la conversación directamente.', ['📱 ' + contactInfo.phone], [B.wa('💬 Agendar por WhatsApp', 'Hola PETSLAND, quiero solicitar una cita.'), B.nav('Ir al formulario', 'contacto')]);
      pl.after = 'Si prefieres escribir por correo: 📧 ' + contactInfo.email;
      return pl;
    }

    // Contacto directo
    const wantsContact = /\b(hablar|contactar|contactarlos|comunicar|comunicarme|escribir|escribirles|llamar)\b/.test(n) || /\bhacer una consulta\b/.test(n) || /\b(pedir|ordenar) (comida|alimento)/.test(n) || (/^quiero (comprar|pedir)\s*(algo|comida|alimento)?$/.test(n));
    if (wantsContact && !hasProductEntity && !groups.some((g) => g !== 'consulta')) {
      return P('Claro. Puedes hablar directamente con PETSLAND por WhatsApp.', [], contactButtons());
    }

    // Horarios (no se inventan)
    if (/\b(horario|horarios|abren|abierto|cierran|atienden|atencion hasta)\b/.test(n)) {
      return P('No tengo información de horarios para compartir con seguridad. Para confirmarlos puedes escribir directamente a PETSLAND por WhatsApp al ' + contactInfo.phone + '.', [], [B.wa('💬 Preguntar por WhatsApp', 'Hola PETSLAND, quiero consultar los horarios de atención.'), B.mail()]);
    }

    // Andrea
    if (/\b(andrea|duena|propietaria|dueno|propietario)\b/.test(n)) {
      return P('Andrea Vargas es la propietaria de PETSLAND. PETSLAND busca ofrecer una atención cercana y humana para el cuidado de las mascotas.', [], [B.wa('💬 Escribir a PETSLAND', 'Hola, quiero comunicarme con Andrea.'), B.mail(), B.nav('Conocer a Andrea', 'andrea')]);
    }

    // Ubicación
    if (/\b(donde|direccion|ubicacion|ubicados|ubicada|llego|llegar|queda)\b/.test(n)) {
      return P('PETSLAND está ubicada en ' + contactInfo.address, [], [B.nav('Ver contacto', 'contacto'), B.wa('💬 Preguntar por WhatsApp', 'Hola PETSLAND, quiero saber cómo llegar.')]);
    }

    // WhatsApp / teléfono
    if (/\b(whatsapp|wasap|whats|telefono|numero|celular|llamar)\b/.test(n) && !hasProductEntity) {
      return P('El WhatsApp y teléfono de PETSLAND es ' + contactInfo.phone + '.', [], [B.wa('💬 Abrir WhatsApp'), { label: '📞 Llamar', type: 'link', href: contactInfo.tel }]);
    }

    // Correo
    if (/\b(correo|email|e-mail|mail|gmail)\b/.test(n)) {
      return P('El correo de contacto de PETSLAND es ' + contactInfo.email + '.', [], [B.mail(), B.wa()]);
    }

    // Instagram
    if (/\b(instagram|insta|ig|redes)\b/.test(n)) {
      return P('El Instagram de PETSLAND es ' + contactInfo.ig + '.', [], [B.ig(), B.wa()]);
    }

    // Qué es PETSLAND
    if (/\bque es petsland\b|\bquienes son\b|\bquienes somos\b/.test(n)) {
      return P('PETSLAND es una veterinaria en Bogotá que busca ofrecer una atención cercana, humana y con comunicación clara. Aquí puedes consultar servicios, alimentos y accesorios con sus precios.', [], [B.nav('Conocer PETSLAND', 'nosotros'), B.send('Ver servicios', '¿Qué servicios tienen?'), B.send('Ver precios', 'Ver precios')]);
    }

    // Comparaciones y "mejor"
    if (/\b(diferencia|diferencias|comparar|comparacion|versus|vs|mejor|mejores|recomiendas|recomienda|recomendacion)\b/.test(n)) {
      if (brands.length >= 2) {
        const lines = brands.map((b) => {
          const items = foodList({ brands: [b], species });
          return items.length ? b + ': ' + items.length + (items.length === 1 ? ' producto' : ' productos') + ', desde ' + fmtPrice(minPrice(items)) : b + ': no aparece en el catálogo actual';
        });
        remember({ brands, species: species || null, acc: null, groups: [] });
        return P('Son opciones de diferentes líneas y formulaciones. Puedes revisar presentación, etapa de vida y características del producto en nuestro catálogo.', lines,
          [B.send('Precios de ' + brands[0], brands[0] + (species ? ' para ' + species : '')), B.send('Precios de ' + brands[1], brands[1] + (species ? ' para ' + species : '')), B.nav('Ver catálogo', 'catalogo')]);
      }
      return P('No puedo decir que una marca sea mejor que otra. Puedes comparar presentación, etapa de vida y precio en nuestro catálogo, y para una recomendación personalizada consultar con PETSLAND.', [], [B.nav('Ver catálogo', 'catalogo'), B.wa('💬 Consultar por WhatsApp', 'Hola PETSLAND, quiero una recomendación de alimento para mi mascota.')]);
    }

    // Baratos
    if (/\b(barato|baratos|barata|baratas|economico|economicos|economica|economicas|mas bajo|menor precio)\b/.test(n)) return cheapest();

    // Conejos u otras especies sin productos
    if (/\b(conejo|conejos|hamster|ave|aves|pajaro|pajaros|tortuga|pez|peces)\b/.test(n) && !brands.length) {
      return P('No encuentro productos específicos para esa especie en el catálogo actual de PETSLAND. Puedes consultar directamente por WhatsApp para confirmar si está disponible.', [], [B.wa('💬 Consultar por WhatsApp', 'Hola PETSLAND, quiero consultar por productos para mi mascota.'), B.mail()]);
    }

    // Servicios
    if (/\bservicios veterinarios\b|\bservicios medicos\b/.test(n)) return serviceOverview(['consulta', 'prevencion', 'medicos']);
    if (groups.length && !brands.length && !accKey) return answerServices(groups, n);
    if (/\b(servicio|servicios|ofrecen|prestan)\b/.test(n) && !hasProductEntity) return serviceOverview();

    // Accesorios
    if (accKey && !brands.length) return answerAccessory(accKey, species, intent, n);
    if (/\baccesorio(s)?\b/.test(n) && !brands.length) return accessoryOverview();

    // Marca
    if (brands.length) return answerBrand(brands, species, stage, type, sterile, intent, brandInfo.rest);

    // Alimentos por especie / etapa / tipo
    if (type || stage || sterile || /\b(comida|alimento|alimentos|concentrado|concentrados|croquetas|nutricion)\b/.test(n)) {
      if (!species && !stage && !type && !sterile) {
        return P('¿La comida es para perro o para gato?', [], [B.send('🐶 Para perro', 'Muéstrame comida para perros'), B.send('🐱 Para gato', 'Muéstrame comida para gatos')]);
      }
      return answerFood(species, stage, type, sterile, intent);
    }

    // Ver precios / catálogo
    if (/\bver precios\b|^precios?$|\blista de precios\b/.test(n)) return pricesMenu();
    if (/\b(catalogo|tienda|productos)\b/.test(n)) {
      return P('Puedes explorar el catálogo completo de alimentos y accesorios, con filtros y precios.', [], [B.nav('Ver catálogo de alimentos', 'catalogo'), B.nav('Ver accesorios', 'productos-accesorios'), B.send('Ver precios', 'Ver precios')]);
    }

    // Solo especie (con contexto)
    if (species && wordCount <= 3) {
      if (ctx.brands.length) return answerBrand(ctx.brands, species, null, null, false, 'price');
      return answerFood(species, null, null, false, 'show');
    }

    // Precio sin sujeto → usar contexto
    if (intent === 'price' || intent === 'have') {
      if (ctx.brands.length) return answerBrand(ctx.brands, ctx.species, null, null, false, 'price');
      if (ctx.acc) return answerAccessory(ctx.acc, null, 'price', '');
      if (ctx.groups && ctx.groups.length) return answerServices(ctx.groups, '');
    }

    // Búsqueda por palabras en el catálogo
    const found = tokenSearch(n);
    if (found.length && found.length <= 12) {
      remember({ brands: [], species: null, acc: null, groups: [] });
      return P('Esto es lo que encontré en el catálogo:', found.map(lineOf), [B.nav('Ver catálogo', 'catalogo'), B.wa()]);
    }

    if (intent === 'price' || intent === 'have' || intent === 'buy') {
      if (!found.length && wordCount > 2) {
        return P('No encuentro ese producto en el catálogo actual de PETSLAND. Puedes consultar directamente por WhatsApp para confirmar si está disponible.', [], [B.wa('💬 Consultar por WhatsApp', 'Hola PETSLAND, quiero consultar por: ' + raw), B.send('Ver precios', 'Ver precios')]);
      }
      return P('¿De qué producto o servicio quieres saber el precio?', [], QUICK_MAIN.slice(0, 6));
    }

    return fallbackAnswer();
  }

  function handleUserText(text) {
    const t = String(text || '').trim();
    if (!t) return;
    pushMessage({ from: 'user', text: t });
    const typing = document.createElement('div');
    typing.className = 'msg msg-bot msg-typing';
    typing.textContent = 'Escribiendo…';
    chatLog.appendChild(typing);
    chatLog.scrollTop = chatLog.scrollHeight;
    setTimeout(() => {
      typing.remove();
      let payload;
      try { payload = respond(t); } catch (err) { payload = fallbackAnswer(); }
      pushMessage({ from: 'bot', payload });
    }, 380);
  }

  /* ---- Eventos del chat ---- */
  chatFab.addEventListener('click', () => setChatOpen(chatWin.hidden));
  $('#chat-close').addEventListener('click', () => { setChatOpen(false); chatFab.focus(); });
  chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const v = chatInput.value;
    chatInput.value = '';
    handleUserText(v);
  });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !chatWin.hidden) { setChatOpen(false); chatFab.focus(); } });

  // Franja de accesos rápidos
  QUICK_STRIP.forEach((b) => renderButton(b, $('#chat-quick')));

  /* =====================================================
     INICIO
     ===================================================== */
  renderAccChips();
  renderAccessories();
  renderServiceTabs();
  renderServices();
  syncControls();
  renderCatalog();
  loadChat();

})();
