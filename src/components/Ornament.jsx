// Recurring national-pattern divider: line · diamond · diamond · diamond · line
// (the small h2 variant is a shortened line + two diamonds).
export default function Ornament({ small = false }) {
  return small ? (
    <div className="ornament ornament-sm" aria-hidden="true">
      <span className="orn-line"></span>
      <span className="orn-gem"></span>
      <span className="orn-gem orn-gem-light"></span>
    </div>
  ) : (
    <div className="ornament" aria-hidden="true">
      <span className="orn-line"></span>
      <span className="orn-gem"></span>
      <span className="orn-gem orn-gem-light"></span>
      <span className="orn-gem"></span>
      <span className="orn-line"></span>
    </div>
  )
}
