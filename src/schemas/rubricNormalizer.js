import { schema, normalize } from "normalizr";

const rubric = new schema.Entity('rubrics');
const rubricList = [rubric];
const rubricNormalizer = rubricResult => normalize(rubricResult, rubricList);
export default rubricNormalizer;