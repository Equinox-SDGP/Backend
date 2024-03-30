import { Request, Response, NextFunction } from "express";
import * as spaceService from "../services/spaceService";
import { IFusionSpace, ISpace } from "../repository/models/spaceModel";

/** GET */
export const getSpaceDataList = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const spaces = await spaceService.getSpacesList();
  console.log("spaces: " + spaces);
  if (spaces) res.status(200).json(spaces);
  else res.status(404).json({ message: "Spaces not found" });
};

export const getSpace = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const space = await spaceService.getSpace(req.params.id);
  if (space) res.status(200).json(space);
  else res.status(404).json({ message: "Space not found" });
};

export const updateSpaceListWithFusion = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const fusionSpaces = (await spaceService.getSpacesListFromFusion()) as
    | IFusionSpace[]
    | void;

  if (fusionSpaces === undefined) {
    res.status(200).json({ message: "No data found from fusion solar api" });
    return;
  }

  fusionSpaces.forEach(async (fusionSpace) => {
    const space = await spaceService.getSpace(fusionSpace.plantCode);
    const updatedSpace = {
      ...fusionSpace,
      _id: fusionSpace.plantCode,
    } as ISpace;
    delete updatedSpace.plantCode;

    if (space) {
      await spaceService.updateSpace(updatedSpace._id, updatedSpace);
    } else {
      await spaceService.createSpace(updatedSpace);
    }
  });
  res.status(201).json({ message: "Information updated" });
};
