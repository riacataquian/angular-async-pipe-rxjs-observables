import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const people = [
      { id: 1, name: 'Person 1' },
      { id: 2, name: 'Person 2' },
      { id: 3, name: 'Person 3' },
      { id: 4, name: 'Person 4' },
      { id: 5, name: 'Person 5' },
    ];
    return {people};
  }
}
