import { z } from "zod";

const ClientCategory = z.enum(["cat_1", "cat_2"])

const categoriesArray = ClientCategory.options.map(option => option) 

export {ClientCategory, categoriesArray}