import { Person } from './person';

/**
 * Describes the response by the backend.
 */
export class Response {
  items: Person[];
  counter: number;
}
