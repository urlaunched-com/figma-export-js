import { API, ENDPOINTS } from "../../../shared";
import { INodeResponse, INodes } from "../types";
import { IStyle } from "../../styles";
import { IComponent } from "../../components";

export const fetchNodesApi = async (data: IStyle[]|IComponent[]): Promise<INodes> => {
  try {
    const nodes = data.map((item) => item.node_id).join(',');
    const response: INodeResponse = await API(ENDPOINTS.NODES, `?ids=${nodes}`);
    return response.nodes as INodes;
  } catch (error) {
    console.error('Error during API call', error);
    throw error;
  }
};
