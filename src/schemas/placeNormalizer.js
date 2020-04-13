import { schema, normalize } from "normalizr";

const phone = new schema.Entity('phones');
const feature = new schema.Entity('features');
const workTime = new schema.Entity('workTime');
const photo = new schema.Entity('photos');
const rubric = new schema.Entity('rubrics');
const menuFile = new schema.Entity('menuFiles', {
    rubrics: [rubric]
});
const placeType = new schema.Entity('placeTypes');
const cuisine = new schema.Entity('cuisines');
const place = new schema.Entity('places', {
    phones: [phone],
    features: [feature],
    work_time: [workTime],
    photos: [photo],
    menu_files: [menuFile],
    place_types: [placeType],
    cuisines: [cuisine]
});
const placeList = [place];
const placeNormalizer = placeResult => normalize(placeResult, placeList);
export default placeNormalizer;