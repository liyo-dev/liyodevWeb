import { Injectable } from '@angular/core';
import { MINIJUEGO } from './minijuego.config';

/** Lo que el minijuego manda a la web al terminar una partida (PuenteWeb.Partida en Unity). */
export interface Partida {
  version: number;
  semilla: number;
  personaje: string;
  puntos: number;
  puertas: number;
  perfectas: number;
  pasos: number;
  toques: number[];
}

export interface FilaDelRanking {
  apodo: string;
  puntos: number;
  puertas: number;
  personaje: string;
}

/**
 * Ranking del concurso en Firestore, por su API REST (sin el SDK de Firebase, para no cargar la
 * web). Las partidas son públicas (apodo y puntos); los emails van aparte y solo se pueden crear,
 * nunca leer desde la web (ver firestore.rules).
 */
@Injectable({ providedIn: 'root' })
export class RankingService {
  private readonly base =
    `https://firestore.googleapis.com/v1/projects/${MINIJUEGO.firebase.projectId}/databases/(default)/documents`;
  private readonly concurso = `concursos/${MINIJUEGO.concurso.id}`;

  async mejores(cuantos = 20): Promise<FilaDelRanking[]> {
    const consulta = {
      structuredQuery: {
        from: [{ collectionId: 'partidas' }],
        orderBy: [{ field: { fieldPath: 'puntos' }, direction: 'DESCENDING' }],
        limit: cuantos,
      },
    };
    const r = await fetch(`${this.base}/${this.concurso}:runQuery?key=${MINIJUEGO.firebase.apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(consulta),
    });
    if (!r.ok) throw new Error(`Ranking: ${r.status}`);
    const filas: any[] = await r.json();
    return filas
      .filter(f => f.document)
      .map(f => {
        const c = f.document.fields;
        return {
          apodo: c.apodo?.stringValue ?? '?',
          puntos: Number(c.puntos?.integerValue ?? 0),
          puertas: Number(c.puertas?.integerValue ?? 0),
          personaje: c.personaje?.stringValue ?? '',
        };
      });
  }

  /** Guarda la partida y, si hay email, el contacto (aparte y privado). Devuelve el id de la partida. */
  async guardar(partida: Partida, apodo: string, email: string): Promise<string> {
    const doc = {
      fields: {
        apodo: { stringValue: apodo },
        puntos: { integerValue: String(partida.puntos) },
        puertas: { integerValue: String(partida.puertas) },
        perfectas: { integerValue: String(partida.perfectas) },
        pasos: { integerValue: String(partida.pasos) },
        semilla: { integerValue: String(partida.semilla) },
        personaje: { stringValue: partida.personaje },
        version: { integerValue: String(partida.version) },
        toques: { arrayValue: { values: partida.toques.map(t => ({ integerValue: String(t) })) } },
        fecha: { timestampValue: new Date().toISOString() },
      },
    };
    const r = await fetch(`${this.base}/${this.concurso}/partidas?key=${MINIJUEGO.firebase.apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(doc),
    });
    if (!r.ok) throw new Error(`Guardar partida: ${r.status}`);
    const creada = await r.json();
    const id = String(creada.name).split('/').pop()!;

    if (email) {
      const contacto = {
        fields: {
          partida: { stringValue: id },
          apodo: { stringValue: apodo },
          email: { stringValue: email },
          fecha: { timestampValue: new Date().toISOString() },
        },
      };
      const rc = await fetch(`${this.base}/${this.concurso}/contactos?key=${MINIJUEGO.firebase.apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contacto),
      });
      if (!rc.ok) throw new Error(`Guardar contacto: ${rc.status}`);
    }
    return id;
  }
}
