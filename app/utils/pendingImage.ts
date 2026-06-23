// Tiny in-memory handoff for an image selected on the landing page that should
// be processed on the /convert page. Client-side navigation keeps this module
// alive, so we can pass the File directly without serializing it.

let pendingImage: File | null = null;

export function setPendingImage(file: File) {
  pendingImage = file;
}

// Returns the pending image (if any) and clears it, so it's only consumed once.
export function takePendingImage(): File | null {
  const file = pendingImage;
  pendingImage = null;
  return file;
}
