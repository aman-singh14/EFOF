import React, { useEffect, useRef } from 'react';
import Matter, { Body as MatterBody } from 'matter-js';

// Expanded SVGs for more school supplies, no background rects
const supplies = [
  {
    name: 'Pencil',
    svg: (
      <svg width="40" height="120" viewBox="0 0 40 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="10" y="20" width="20" height="80" rx="8" fill="#000" stroke="#fff" strokeWidth="3"/>
        <polygon points="10,20 20,5 30,20" fill="#fff" stroke="#fff" strokeWidth="2"/>
        <rect x="10" y="100" width="20" height="10" rx="3" fill="#000" stroke="#fff" strokeWidth="2"/>
      </svg>
    ),
    width: 40,
    height: 120,
  },
  {
    name: 'Pen',
    svg: (
      <svg width="30" height="110" viewBox="0 0 30 110" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="8" y="20" width="14" height="70" rx="6" fill="#000" stroke="#fff" strokeWidth="3"/>
        <polygon points="8,20 15,5 22,20" fill="#fff" stroke="#fff" strokeWidth="2"/>
        <rect x="8" y="90" width="14" height="10" rx="3" fill="#000" stroke="#fff" strokeWidth="2"/>
      </svg>
    ),
    width: 30,
    height: 110,
  },
  {
    name: 'Eraser',
    svg: (
      <svg width="60" height="40" viewBox="0 0 60 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="5" y="10" width="50" height="20" rx="6" fill="#000" stroke="#fff" strokeWidth="3"/>
        <rect x="35" y="10" width="20" height="20" rx="6" fill="#000" stroke="#fff" strokeWidth="3"/>
      </svg>
    ),
    width: 60,
    height: 40,
  },
  {
    name: 'Ruler',
    svg: (
      <svg width="100" height="20" viewBox="0 0 100 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="2" y="2" width="96" height="16" rx="5" fill="#000" stroke="#fff" strokeWidth="3"/>
        <line x1="10" y1="5" x2="10" y2="15" stroke="#fff" strokeWidth="2"/>
        <line x1="20" y1="5" x2="20" y2="15" stroke="#fff" strokeWidth="2"/>
        <line x1="30" y1="5" x2="30" y2="15" stroke="#fff" strokeWidth="2"/>
        <line x1="40" y1="5" x2="40" y2="15" stroke="#fff" strokeWidth="2"/>
        <line x1="50" y1="5" x2="50" y2="15" stroke="#fff" strokeWidth="2"/>
        <line x1="60" y1="5" x2="60" y2="15" stroke="#fff" strokeWidth="2"/>
        <line x1="70" y1="5" x2="70" y2="15" stroke="#fff" strokeWidth="2"/>
        <line x1="80" y1="5" x2="80" y2="15" stroke="#fff" strokeWidth="2"/>
        <line x1="90" y1="5" x2="90" y2="15" stroke="#fff" strokeWidth="2"/>
      </svg>
    ),
    width: 100,
    height: 20,
  },
  // New: Scissors
  {
    name: 'Scissors',
    svg: (
      <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="18" cy="18" r="10" fill="#000" stroke="#fff" strokeWidth="3"/>
        <circle cx="42" cy="42" r="10" fill="#fff" stroke="#000" strokeWidth="3"/>
        <line x1="18" y1="18" x2="42" y2="42" stroke="#fff" strokeWidth="4"/>
        <line x1="18" y1="42" x2="42" y2="18" stroke="#000" strokeWidth="4"/>
      </svg>
    ),
    width: 60,
    height: 60,
  },
  // New: Notebook
  {
    name: 'Notebook',
    svg: (
      <svg width="50" height="60" viewBox="0 0 50 60" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="5" y="5" width="40" height="50" rx="6" fill="#000" stroke="#fff" strokeWidth="3"/>
        <line x1="10" y1="15" x2="40" y2="15" stroke="#fff" strokeWidth="2"/>
        <line x1="10" y1="25" x2="40" y2="25" stroke="#fff" strokeWidth="2"/>
        <line x1="10" y1="35" x2="40" y2="35" stroke="#fff" strokeWidth="2"/>
        <line x1="10" y1="45" x2="40" y2="45" stroke="#fff" strokeWidth="2"/>
      </svg>
    ),
    width: 50,
    height: 60,
  },
  // New: Crayon
  {
    name: 'Crayon',
    svg: (
      <svg width="30" height="90" viewBox="0 0 30 90" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="8" y="20" width="14" height="60" rx="6" fill="#000" stroke="#fff" strokeWidth="3"/>
        <polygon points="8,20 15,5 22,20" fill="#fff" stroke="#fff" strokeWidth="2"/>
        <rect x="8" y="80" width="14" height="7" rx="3" fill="#000" stroke="#fff" strokeWidth="2"/>
      </svg>
    ),
    width: 30,
    height: 90,
  },
  // New: Glue
  {
    name: 'Glue',
    svg: (
      <svg width="40" height="80" viewBox="0 0 40 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="10" y="20" width="20" height="50" rx="8" fill="#000" stroke="#fff" strokeWidth="3"/>
        <rect x="15" y="10" width="10" height="15" rx="4" fill="#000" stroke="#fff" strokeWidth="2"/>
        <rect x="10" y="70" width="20" height="7" rx="3" fill="#000" stroke="#fff" strokeWidth="2"/>
      </svg>
    ),
    width: 40,
    height: 80,
  },
  // New: Paperclip
  {
    name: 'Paperclip',
    svg: (
      <svg width="40" height="60" viewBox="0 0 40 60" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="15" y="10" width="10" height="40" rx="5" fill="#000" stroke="#fff" strokeWidth="3"/>
        <rect x="20" y="20" width="5" height="20" rx="2.5" fill="#000" stroke="#fff" strokeWidth="2"/>
      </svg>
    ),
    width: 40,
    height: 60,
  },
  // New: Sharpener
  {
    name: 'Sharpener',
    svg: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="5" y="5" width="30" height="30" rx="8" fill="#000" stroke="#fff" strokeWidth="3"/>
        <rect x="17" y="10" width="6" height="20" rx="3" fill="#000" stroke="#fff" strokeWidth="2"/>
      </svg>
    ),
    width: 40,
    height: 40,
  },
  // New: Paintbrush
  {
    name: 'Paintbrush',
    svg: (
      <svg width="30" height="100" viewBox="0 0 30 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="10" y="30" width="10" height="60" rx="5" fill="#000" stroke="#fff" strokeWidth="3"/>
        <ellipse cx="15" cy="20" rx="8" ry="15" fill="#000" stroke="#fff" strokeWidth="2"/>
      </svg>
    ),
    width: 30,
    height: 100,
  },
  // New: Highlighter
  {
    name: 'Highlighter',
    svg: (
      <svg width="30" height="90" viewBox="0 0 30 90" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="8" y="20" width="14" height="60" rx="6" fill="#000" stroke="#fff" strokeWidth="3"/>
        <rect x="8" y="80" width="14" height="7" rx="3" fill="#000" stroke="#fff" strokeWidth="2"/>
      </svg>
    ),
    width: 30,
    height: 90,
  },
];

const NUM_SUPPLIES = 32; // More objects for a fuller effect

// Type helper to allow custom property on Matter.Body
interface SupplyBody extends MatterBody {
  supplyIndex: number;
}

const FallingSupplies: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = React.useState({ width: 0, height: 0 });
  const [_, setRerender] = React.useState(0);
  const bodiesRef = useRef<Matter.Body[]>([]);
  const engineRef = useRef<Matter.Engine | null>(null);

  // Responsive: update dimensions on resize
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        });
      }
    };
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  useEffect(() => {
    if (!dimensions.width || !dimensions.height) return;
    const Engine = Matter.Engine;
    const World = Matter.World;
    const Bodies = Matter.Bodies;
    const Runner = Matter.Runner;
    const Composite = Matter.Composite;
    const Events = Matter.Events;

    const engine = Engine.create();
    engineRef.current = engine;
    const world = engine.world;

    // Create ground
    const ground = Bodies.rectangle(
      dimensions.width / 2,
      dimensions.height - 10,
      dimensions.width,
      20,
      { isStatic: true, render: { fillStyle: '#e0cda9' } }
    );
    World.add(world, [ground]);

    // Add random supplies
    const bodies = [];
    for (let i = 0; i < NUM_SUPPLIES; i++) {
      const supply = supplies[Math.floor(Math.random() * supplies.length)];
      const x = Math.random() * (dimensions.width - supply.width) + supply.width / 2;
      const y = -50 - Math.random() * 200;
      const angle = Math.random() * Math.PI * 2;
      const body = Bodies.rectangle(
        x,
        y,
        supply.width,
        supply.height,
        {
          restitution: 0.5 + Math.random() * 0.2,
          friction: 0.5,
          angle,
          render: { visible: false },
        }
      ) as SupplyBody;
      body.supplyIndex = supplies.indexOf(supply);
      bodies.push(body);
    }
    bodiesRef.current = bodies;
    World.add(world, bodies);

    // Run the engine
    const runner = Runner.create();
    Runner.run(runner, engine);

    // Rerender on every tick
    const rerender = () => setRerender((v) => v + 1);
    Events.on(engine, 'afterUpdate', rerender);

    return () => {
      Events.off(engine, 'afterUpdate', rerender);
      Runner.stop(runner);
      Composite.clear(engine.world, false);
      Engine.clear(engine);
    };
  }, [dimensions]);

  // Render SVGs at body positions
  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
        overflow: 'hidden',
      }}
      aria-hidden="true"
    >
      {bodiesRef.current.map((body, i) => {
        const supply = supplies[(body as SupplyBody).supplyIndex];
        const { position, angle } = body;
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: position.x - supply.width / 2,
              top: position.y - supply.height / 2,
              width: supply.width,
              height: supply.height,
              transform: `rotate(${angle}rad)`,
              zIndex: 1,
              pointerEvents: 'none',
              filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.10))',
              transition: 'box-shadow 0.2s',
            }}
          >
            {supply.svg}
          </div>
        );
      })}
    </div>
  );
};

export default FallingSupplies; 