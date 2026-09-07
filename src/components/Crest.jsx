import BrandWave from "@/components/BrandWave";

// The crest: a dark band with the wave rising through it. Its final band is
// foam, so the artwork resolves into the page ground rather than ending on a
// hard edge. Opens the page above the hero and closes it before the footer.
export default function Crest({ closing = false }) {
  const band = (
    <div className="crest">
      <div className="crest__art" aria-hidden="true">
        <BrandWave variant="crest" />
      </div>
      <div className="crest__pad" />
    </div>
  );

  // The footer is fixed, so the closing band carries its own clearance: the
  // page ground below the artwork is exactly what the footer covers.
  return closing ? <div className="crest-close">{band}</div> : band;
}
