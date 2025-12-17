export function DecorativeShapes() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Top left circle */}
      <div className="absolute -top-12 -left-12 w-32 h-32 rounded-full bg-secondary/10" />
      
      {/* Top right square */}
      <div className="absolute top-20 -right-8 w-24 h-24 bg-primary/5 rotate-12" />
      
      {/* Middle left rectangle */}
      <div className="absolute top-1/3 -left-6 w-48 h-16 bg-secondary/5 rounded-3xl" />
      
      {/* Bottom right triangle-like shape */}
      <div className="absolute -bottom-12 right-12 w-40 h-40 bg-primary/5 rounded-full" />
      
      {/* Center accent */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full border border-secondary/10" />
    </div>
  );
}
