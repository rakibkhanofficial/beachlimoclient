import axios, { AxiosResponse } from "axios";
import { endPoints } from "~@/utils/api/route";
interface RefreshTokenResponse {
    statusCode: number
    data: {
      accessToken: string
      access_tokenExpiresIn: string
      refreshToken: string
      refresh_tokenExpiresIn: string
    }
  }
  
 export  async function reFreshToken(refreshToken: string): Promise<{
    newaccessToken: string
    newAccesstokenExpiresin: string
    newrefreshToken: string
    newRefreshTokenExpiresIn: string
  }> {
    try {
      const response: AxiosResponse<RefreshTokenResponse> = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}${endPoints.auth.refreshToken}`,
        { refreshToken: refreshToken },
      )
  
      const responseData = response.data
      if (responseData.statusCode === 200) {
        const newAccessToken = responseData?.data?.accessToken
        const newRefreshToken = responseData?.data?.refreshToken
        const newaccessTokenExpiresIn = responseData?.data?.access_tokenExpiresIn
        const newrefreshTokenExpiresIn = responseData?.data?.refresh_tokenExpiresIn
        return {
          newaccessToken: newAccessToken,
          newrefreshToken: newRefreshToken,
          newAccesstokenExpiresin: newaccessTokenExpiresIn,
          newRefreshTokenExpiresIn: newrefreshTokenExpiresIn,
        }
      } else {
        throw new Error('Failed to refresh token: Invalid response')
      }
    } catch (error) {
      console.error('Error refreshing token:', error)
      throw new Error('Failed to refresh token')
    }
  }