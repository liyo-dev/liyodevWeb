// Ajustes del minijuego «Cruza el portal» y su concurso.
// Mientras `activo` sea false, la web no enseña nada del minijuego (ni la página ni el aviso).

export const MINIJUEGO = {
  /** Encender cuando el juego esté exportado en public/minijuego y Firestore configurado. */
  activo: false,

  /** Carpeta donde Unity deja la exportación (Sendero Minijuego ▸ 4. Exportar a la web). */
  carpeta: '/minijuego',
  nombreDelBuild: 'minijuego',

  concurso: {
    /** Id del documento en Firestore: concursos/{id}. Ese documento lleva el campo `fin` (timestamp). */
    id: 'cruza-el-portal-2026',
    /** Debe coincidir con el `fin` del documento de Firestore (que es el que manda). */
    fin: '2026-12-20T20:00:00+01:00',
    inicio: '2026-12-01T10:00:00+01:00',
    /** 0 = recorrido distinto cada día (semilla del día). Otro número = el mismo para todos. */
    semilla: 0,
  },

  /**
   * Proyecto de Firebase (consola ▸ Configuración del proyecto ▸ Tus apps ▸ Web).
   * La apiKey de una app web de Firebase es pública por diseño; lo que protege los datos son las
   * reglas de firestore.rules.
   */
  firebase: {
    projectId: 'liyodev',
    apiKey: 'PEGAR_AQUI_LA_API_KEY_WEB',
  },
};
