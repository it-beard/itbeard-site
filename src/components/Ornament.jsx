// Recurring national-pattern divider: line · diamond · diamond · diamond · line
export default function Ornament() {
  return (
    <div className="ornament" aria-hidden="true">
      <span className="orn-line"></span>
      <span className="orn-gem"></span>
      <span className="orn-gem orn-gem-accent"></span>
      <span className="orn-gem"></span>
      <span className="orn-line"></span>
    </div>
  )
}
