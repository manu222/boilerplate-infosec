const bcrypt = require('bcrypt');

test('bcrypt should be properly required', () => {
  expect(typeof bcrypt.hash).toBe('function');
});

test('bcrypt should hash a password', async () => {
  const saltRounds = 10;
  const myPlaintextPassword = 's0/\/\P4$$w0rD';
  const hash = await bcrypt.hash(myPlaintextPassword, saltRounds);
  expect(hash).toMatch(/^\$2[ayb]\$.{56}$/);
});