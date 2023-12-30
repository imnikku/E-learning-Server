
// ###################### Get user by id #########################################

import { Response } from "express";
import { radis } from "../utils/RadisConfig.utils";

export const getUserById = async (id: string, res: Response) => {
    const session = await radis.get(id) as any;
    const user=JSON.parse(session);
    res.status(200).json({
        success: true,
        user

    })
}