import { pokeFetch } from './poke-fetch';

describe('pokeFetch', () => {
  it('should work', () => {
    expect(pokeFetch()).toEqual('poke-fetch');
  });
});
