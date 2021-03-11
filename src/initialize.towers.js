import { curry, sortBy } from 'lodash';

export const initializeTowers = curry(
  /**
   * Initialize the buildings
   * @param {WorldState} worldState
   * @returns {WorldState}
   */
  (worldState) => {
    const { structures } = worldState;

    /**
     * @type {StructureTower[]}
     */
    const towers = structures.filter(
      (structure) => structure.structureType === STRUCTURE_TOWER
    );

    const otherStructures = structures.filter(
      (structure) => structure.structureType !== STRUCTURE_TOWER
    );

    /** @type {AnyStructure[]} */
    const otherStructuresSortedByHits = sortBy(otherStructures, 'hits');

    towers.forEach((tower) => {
      otherStructuresSortedByHits.forEach((structure) => {
        if (structure.hits < 5000 || structure.ticksToDecay < 100) {
          if (tower.repair(structure) < 0) {
            console.log(
              `Tower tried to repair ${structure.name} but no success.`
            );
          }
        }
      });
    });

    return {
      ...worldState,
      towers,
    };
  }
);
