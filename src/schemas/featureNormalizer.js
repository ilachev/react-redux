import { schema, normalize } from "normalizr";

const feature = new schema.Entity('features');
const featureList = [feature];
const featureNormalizer = featureResult => normalize(featureResult, featureList);
export default featureNormalizer;