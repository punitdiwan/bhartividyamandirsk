import Link from "next/link"
import React, { useState, useEffect } from 'react';
import { base_url, school_name } from '../SimpleState/auth'
import axios from 'axios';
import Layout from "../Component/Layout";

const AboutUs = ({ data_header }) => {

  const [data, setdata] = useState("")
  const get_base_url = base_url.use()
  const get_school_name = school_name.use()


  useEffect(() => {
    axios.get(`${get_base_url}/${get_school_name}/items/tabs?fields=title,heading,body,images.directus_files_id.data.full_url`)
      .then((response) => {


        if (response?.data?.data?.length > 0) {
          console.log(response.data);
          setdata(response.data.data[0])
          // response?.data?.data[0].map((data1,i)=>{
          //     setdata(data1) 
          //     console.log(data1);
          // })
          //   setdata(response) 
        }

      })
      .catch((error) => {
        console.log(error);
      })


  }, [])

  return (
    <Layout header_data={data_header}>
      <div
        className="mx-3 "
      >
        <img
          className="w-full "
          src="/images/upper.png"
        />
        <div className="leading-[ 22.5px] font-normal">
          <h5 className="text-center">
            {/* {data?.heading || "About School"} */}
            About us

          </h5>
          <p className="mb-0">
          Bharti vidya H.Sec. School is a Higher secondary school for both girls and boys managed by Vidhya Bharti Group. Vidya Bharti Group was established in 1991 and run by Mr Devendra Singh Ji. Our institution is recogniged by the Madhya Pradesh Board of education. Bhartiya Vidya Mandir Hr. Sec.This was at a time and age when India was embarking on a growth journey. Since our working years , the environment in which the school has been functioning has gone through many positive changes. The school grew continuously both organically and in terms of its physical size. The school can now boast of a full fledged infrastructure that is now requisite for a Senior Secondary institution. At this juncture, the school continues to realise its vision and goals, as it had set them at the time of its establishment. Further, it is now time for the school to revisit its deeper philosophies and re-align itself in the context of the current environment. In the present scenario the school’s underlying motto has emerged to be excellence in quality of education through individual and personal attention on each child. It is this deep relationship between the teacher and the child that we envisage as the harbinger of our growth 
          </p>
        </div>
        <img
          className="w-full"
          src="/images/lower.png"
        />
      </div>
    </Layout>
  );

}

export default AboutUs;


export async function getStaticProps(context) {
  let data_header

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/${process.env.NEXT_PUBLIC_SCHOOL}/items/config?fields=*,logo.data.full_url`)

    data_header = await response.json()
  }
  catch (error) {
    data_header = false
  }
  return {
    props: { data_header },
    revalidate: 2, // will be passed to the page component as props
  }
}
