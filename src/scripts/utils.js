export function GetShader(name) {
  const vertEl = document.getElementById(`vertex-${name}`);
  const fragEl = document.getElementById(`fragment-${name}`);
  if (!vertEl || !fragEl) {
    throw `Error: couldn't load shader: ${name}`;
  }
  return {
    vertex: vertEl.textContent,
    fragment: fragEl.textContent,
  };
}