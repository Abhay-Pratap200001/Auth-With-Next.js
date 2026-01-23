import {connect} from '@/src/dbConnection/dbConfig'
import {User} from '@/src/models/user.Model'
import { NextRequest, NextResponse} from 'next/server'
import { getDataFromToken } from '@/src/helpers/getDataFrromToken'

connect()


export async function POST(request:NextRequest) {
   const userId = await getDataFromToken(request)
   const user = await User.findOne({_id: userId}).select("-password")
   return NextResponse.json({
    messsage:'User found',
    data: user
   })
}