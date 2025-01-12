# Game Engine

-Base of the engine is a classic 2d engine but with massive customization of the world and Abilities
-Worlds can be Pre made or Procedurally rendered
-Enemies can be made and have all the same customizable powers as the player
-The world has an array of blocks that have different properties, each interact with eachother
-The world is destructable and buildable like Minecraft
-


## Ideas
- Entirely using html canvas
- 2D, Box based
- Minecraft/Terraria based
- Customizable like that one game from youtube

 Game Ideas
    -Terraria mixed with 
        ~Skyrim powers and fantasy (custom powers)
        ~machines and technology
        ~custom weapons and armor
        ~avatar the last airbender type powers
        ~very customizable (character, powers, tech, world, build, enemies, etc)
        ~mix tech (robots, machine, redstone like stuff, nanotech)
        ~nanotech is very maluable, can create tentiles, items, etc
    -Enemies are randomized in Abilities   
        -Killing enemies drops Abilities
    -COLOR STYLE: monochrome like limbo with saturated color for powers and powerful items


## Custom Powers (Predefined Powers vs custom powers)
- Projectile Based
- Buff Based
- Tech Based
    -Hacking
- Movement based
- Fantasy Based
    - Elemental
- Build Based
-Powers relating to an item or enemy in the world
-Random Ideas
    -Possession of items or other character
- Custom states
    -Similar to super sayian but buff a certain ability or power (can customize this)
-Single power source block (powers: machines, power abilities, droids, etc)


2. Types of Modifications
We’ll want several modifiers that influence how the ability works. These modifiers can be triggered by different player actions or inputs:

Mouse Distance/Proximity: The distance of the mouse cursor from the player changes the power's intensity, area, or form. For example:

Closer to the player: Small, concentrated abilities (like a tiny fireball or a precise, single-target attack).
Farther from the player: Larger, spread-out attacks (like a fire spray or a large AOE effect).
Targeting Object: The object or surface you're hovering over also affects how the power works. For example:

If you hover over a block, the fire power could set it on fire.
If you hover over an enemy, the ability could be aimed at them with damage values based on the power's intensity.
Hovering over water could potentially make the power weaker (fire might fizzle out), or if hovering over wood, it could catch fire.
Action Type: The way you trigger the ability also matters.

Tap or Hold: Tap for short bursts (e.g., quick fireball throws) or hold for charged, larger attacks (e.g., a sustained fire stream or a larger explosion).
Combining Inputs: You could combine mouse distance with other actions like pressing certain keys to modify the power even further. For example:
Shift + Mouse Move: Maybe this changes the trajectory of the fireball, making it explode on impact.
Ctrl + Mouse Move: Could adjust the angle of the attack or give the player the ability to cast it at a particular height.


Core Power Types: Start by defining core types of powers (e.g., fire, electricity, healing, etc.), but each one has a base set of behaviors. For instance:
Fire powers: Ignition, Explosion, Spread, etc.
Lightning powers: Chain Lightning, Static Charge, Area Shock, etc.
Healing powers: Single Target Heal, Area Heal, Over Time Regeneration, etc.
Variable Modifiers: Instead of hard coding each possible variation (fireball, fire spray, fire charge, etc.), you can create variable modifiers for each power:
Shape Modifier: Controls whether the power is a projectile, a spray, or an area effect.
Size Modifier: Controls the size or area of effect.
Damage/Power Modifier: Controls how much damage or how much power the ability uses (based on distance, held time, etc.).
Interaction Modifier: Allows interaction with the environment or target (e.g., fire can spread on wood, electricity can jump between enemies, etc.).

## Features
- Physics Engine
- Collision Detection
- Game Loop
- Level Editor
- Asset Manager
- Input Manager
- Particle System
- Cool effects
- Destructible, moveable, and interactive world
- Interaction between things and world 
    -Burning
    -
- Materials and Material features 
- Events and Event System
- Settings and Settings Manager
- Save and Load System
- Health and Damage System
- Custom Abilities and Powers
- Custom Weapons and Armor
- Custom Enemies and Bosses
- Procedurally generated world with Proceedurally generated lore
- Basic building blocks 
    -Pusher, Puller, drill, levitator, tank track like mover
-UI system
-State management (main menu, pause, gave over, etc)
-Camera system
-AI system
-weather and time system
-inventory system
-skill/leveling/achievement
-proceedurally generated random Events
-Asset management
-Animation management

## Structure
- Project Name:
- Project Description:
- Folder Structure:
    - src/
    - tests/
    - docs/
    - assets/

## Models
- Entitiy
    -Position in world
    -physics
    -movement

-Character (Entity)
    -Inventory
    -Health
    -Objective
    -Movement
    -AI

-World
    -Proceedural generation
    - Linked list for handling stages
    -2d matrix of integers that map to a hash of blocktypes
    -

-Material/block
    -

-Proceedural generation 
    -each block and ability has a preset rarity. The likelyhood of spawning is influneced by:
        -Y Level
        -Surrounding block or item
        -

-Event Trigger

-Settings
    -Framerate
    -

-Saving
    -JSON format
    -sterlize and desterilize
    -handle updates to the object and how that affects old saves
        {
        "grid": [
            [0, 1, 0, 2, 0],
            [1, 1, 2, 0, 0],
            [0, 0, 0, 0, 0]
        ],
        "objects": [
            { "type": "DirtBlock", "position": { "x": 1, "y": 1 }, "health": 50 },
            { "type": "StoneBlock", "position": { "x": 2, "y": 0 }, "health": 100 }
        ]
        }
    -Version control
        {
        "version": 1,
        "grid": [
            [0, 1, 0],
            [1, 2, 1]
        ]
        }

Item Identity and Properties
Each component (e.g., metal part, mover block, drill, etc.) should have an identity and set of properties that define its function. This could be an object with attributes like:

Type: (e.g., "metal part," "mover block," "drill," etc.)
Functionality: What it does (e.g., “pushes,” “pulls,” “drills,” “moves,” “levitates”)
Energy Consumption: How much energy it needs to work (if applicable)
Durability/Condition: How much it can take before breaking or needing repair

Component Binding (Attaching Items)
Now, we need to allow items to be attached to one another. You can do this by adding a "connection" property to each item. For example:
A mover block would have a connectedItems array where all items it's connected to are stored.
The car parts could be bound to each other through links (e.g., attaching wheels, body parts, etc. to a central vehicle frame or base).


 Binding to the Player
For controlling a vehicle or machine, the player can bind themselves to the machine as an active controller. You could implement this by:

Having a bind button where the player can link themselves to the machine. Once bound, they control the machine (e.g., move the car, trigger the drill).

Create a universal connection system that can work across any component, allowing the player to bind and rebind pieces as they please.



 Environmental Abilities:
These are abilities tied to the environment, objects, or the world itself.

Health of Blocks: Each object/block in the world has health, which can be modified by abilities.
Example: "Resilient Block" ability increases block health or damage resistance.
Gravity: A world-changing ability that affects how things fall or float.
Example: “Low Gravity” in certain zones or areas.
Weather Abilities: Things like rain, fire, wind, etc.
Example: “Rain” ability makes the environment wet, which could affect fire or electricity abilities.


Option 2: Fixed Camera with a Preview Mechanic
If you stick with a fixed camera:

Add a preview feature: The screen shows part of the next chunk as the player approaches the edge.
This can be done by rendering a small portion of the next screen (e.g., 2-3 tiles wide) on the edge of the current one.
Why It’s Good:
Still keeps a fixed-camera feel but eliminates unfair surprises.
Easier to implement than full camera logic.