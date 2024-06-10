import axios from "axios";
import appConfig from "../utils/AppConfig";
import {
  VacationAction,
  VacationActionType,
  vacationStore,
} from "../redux/VacationState";
import follower from "../models/followers";
import { authStore } from "../redux/AuthState";
import { jwtDecode } from "jwt-decode";

class Followers {
  public async follow(vacationId: string, isFollowing: boolean): Promise<void> {
    const axiosInstance = axios.create({
      headers: {
        token: localStorage.getItem("token") || "",
      },
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const token = authStore.getState().token;
    const userId = jwtDecode<{ user: { id: string } }>(token)?.user.id;

    if (isFollowing) {
      await axiosInstance.post<Followers>(
        appConfig.followUrl,
        {
          userId,
          vacationId,
        },
        config
      );
    } else {
      await axiosInstance.delete<Followers>(
        `${appConfig.followUrl}/${userId}/${vacationId}`,
        config
      );
    }
  }
}

// singleton
const followers = new Followers();
export default followers;
