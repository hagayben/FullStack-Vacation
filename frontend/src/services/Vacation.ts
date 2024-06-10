import axios from "axios";
import appConfig from "../utils/AppConfig";
import {
  VacationAction,
  VacationActionType,
  vacationStore,
} from "../redux/VacationState";
import Vacation from "../models/Vacation";

class Vacations {
  public async getAll(params?: string): Promise<{
    vacations: Vacation[];
    total: number;
    limit: number;
  }> {
    const axiosInstance = axios.create({
      headers: {
        token: localStorage.getItem("token") || "",
      },
    });

    // get the vacations from redux
    let vacations = {
      vacations: vacationStore.getState().vacation,
      total: vacationStore.getState().vacation.length,
      limit: 0,
    };

    // if (vacations.length === 0) {
    // get the products from remote server
    const response = await axiosInstance.get<{
      vacations: Vacation[];
      total: number;
      limit: number;
    }>(appConfig.vacationUrl + params);

    // const { data } = await axios.get<Product[]>(appConfig.productsUrl);
    // return data;

    // extract the data from the response
    vacations = response.data;

    // create an action to set the products into the state,
    // and set the action payload, to hold the products themselves
    const action: VacationAction = {
      type: VacationActionType.SetVacation,
      payload: vacations,
    };

    // now all is left to do, is to send this action to redux
    vacationStore.dispatch(action);
    // }

    return vacations;
  }

  public async getOne(id: string): Promise<Vacation | undefined> {
    const axiosInstance = axios.create({
      headers: {
        token: localStorage.getItem("token") || "",
      },
    });
    let vacations = vacationStore.getState().vacation;

    let vacation = vacations.find((p) => p.id === id);

    if (!vacation) {
      await this.getAll("");

      vacations = vacationStore.getState().vacation;

      vacation = vacations.find((p) => p.id === id);

      // // get a product from remote server
      // const response = await axios.get<Product>(appConfig.productsUrl + `/${id}`);

      // // extract the data from the response
      // product = response.data;
    }

    return vacation;
  }

  public async addVacation(vacation: Vacation): Promise<Vacation> {
    const axiosInstance = axios.create({
      headers: {
        token: localStorage.getItem("token") || "",
      },
    });
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    const response = await axiosInstance.post<Vacation>(
      appConfig.addVacationUrl,
      vacation,
      config
    );

    const addedVacation = response.data;

    // create an AddVacation action for redux
    const action: VacationAction = {
      type: VacationActionType.AddVacation,
      payload: addedVacation,
    };

    // perform the action on redux
    vacationStore.dispatch(action);

    return addedVacation;
  }

  public async deleteVacation(id: string): Promise<void> {
    const axiosInstance = axios.create({
      headers: {
        token: localStorage.getItem("token") || "",
      },
    });
    await axiosInstance.delete(appConfig.vacationUrl + `/${id}`);

    // create a DeleteVacation action for redux
    const action: VacationAction = {
      type: VacationActionType.DeleteVacation,
      payload: id,
    };

    // perform the action on redux
    vacationStore.dispatch(action);
  }

  public async editVacation(vacation: Vacation): Promise<Vacation> {
    const axiosInstance = axios.create({
      headers: {
        token: localStorage.getItem("token") || "",
      },
    });
    const config = {
      headers: {
        // "Content-Type": "application/json",
        "Content-Type": "multipart/form-data",
      },
    };

    const response = await axiosInstance.patch<Vacation>(
      appConfig.editVacationUrl + `/${vacation.id}`,
      vacation,
      config
    );

    const updatedVacation = response.data;

    // create an UpdateVacation action for redux
    const action: VacationAction = {
      type: VacationActionType.UpdateVacation,
      payload: updatedVacation,
    };

    // perform the action on redux
    vacationStore.dispatch(action);

    return updatedVacation;
  }

  public async downloadReport(): Promise<Blob | null> {
    try {
      const axiosInstance = axios.create({
        headers: {
          token: localStorage.getItem("token") || "",
        },
        responseType: "blob",
      });

      const response = await axiosInstance.get<Blob>(
        "http://localhost:8080/api/vacations/csv"
      );

      return response.data;
    } catch {
      return null;
    }
  }

  public async getReport(): Promise<
    {
      destination: string;
      amount: number;
    }[]
  > {
    try {
      const axiosInstance = axios.create({
        headers: {
          token: localStorage.getItem("token") || "",
        },
      });

      const response = await axiosInstance.get< {
        destination: string;
        amount: number;
      }[]>(
        "http://localhost:8080/api/vacations/vacation-report"
      );

      return response.data;
    } catch {
      return [];
    }
  }
}

// singleton
const vacations = new Vacations();
export default vacations;
