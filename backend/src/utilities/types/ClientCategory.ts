import { z } from "zod";

const ClientCategory = z.enum(["cat_1", "cat_2"])

type ClientCategoryType = z.infer<typeof ClientCategory>

const categoriesArray = ClientCategory.options.map(option => option) 

export {ClientCategory, ClientCategoryType, categoriesArray}