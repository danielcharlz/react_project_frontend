// A MongoDB ObjectId is exactly 24 hexadecimal characters.
// We check this before querying so bad input returns a clear 400 error
// instead of a confusing database "CastError".
function isObjectId(value) {
  return typeof value === 'string' && /^[a-f0-9]{24}$/i.test(value);
}

module.exports = isObjectId;
