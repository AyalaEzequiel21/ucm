import { z } from "zod";

const ReportStatus = z.enum(["pendiente", "aprobado"])

const reportStatusArray = ReportStatus.options.map(option => option)

export {ReportStatus, reportStatusArray}