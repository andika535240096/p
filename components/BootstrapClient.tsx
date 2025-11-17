'use client';

import { useEffect } from 'react';

function BootstrapClient() {
  useEffect(() => {
    // Impor Bootstrap JS di sini
    // Ini memastikan kode ini hanya berjalan di sisi client setelah mounting
    require('bootstrap/dist/js/bootstrap.bundle.min.js');
  }, []);

  return null; // Komponen ini tidak me-render UI apapun
}

export default BootstrapClient;