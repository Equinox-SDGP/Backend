import SpaceModel, { ISpace } from "./models/spaceModel";

/** CREATE Methods */
export const createSpace = async (spaceData: ISpace) => {
  const newSpace = new SpaceModel(spaceData);
  return newSpace.save();
};

/** READ Methods */
export const getSpace = (spaceId: string) => {
  const space = SpaceModel.findById(spaceId).exec();
  return space;
};

export const getSpacesList = () => {
  const spacesList = SpaceModel.find().exec();
  return spacesList;
};

/** UPDATE Methods */
export const updateSpace = async (spaceId: string, spaceData: ISpace) => {
  try {
      // Find the space by ID and update it with the provided fields
      const updatedSpace = await SpaceModel.findByIdAndUpdate(spaceId, spaceData, {
          new: true,
      }).exec();
      return updatedSpace;
  } catch (error) {
      console.error("Error updating space:", error);
      throw error;
  }
};

/** DELETE Methods */
export const deleteSpace = (spaceId: string) => {
  const deletedSpace = SpaceModel.findByIdAndDelete(spaceId).exec();
  return deletedSpace;
};

/** Spaces Repository Interface */
export interface ISpaceRepository {
  createSpace: (spaceData: ISpace) => Promise<ISpace>;
  getSpace: (spaceId: string) => Promise<ISpace | null>;
  getSpacesList: () => Promise<ISpace[]>;
  updateSpace: (spaceId: string, spaceData: ISpace) => Promise<ISpace | null>;
  deleteSpace: (spaceId: string) => Promise<ISpace | null>;
}
