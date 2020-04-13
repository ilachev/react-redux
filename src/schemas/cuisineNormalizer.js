import { schema, normalize } from "normalizr";

const cuisine = new schema.Entity('cuisines');
const cuisineList = [cuisine];
const cuisineNormalizer = cuisineResult => normalize(cuisineResult, cuisineList);
export default cuisineNormalizer;