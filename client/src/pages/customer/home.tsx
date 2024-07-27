import Hero from "@/components/common/hero";

const CustomerHomePage = () => {
  return (
    <div className="mt-10">
      <Hero />

      <div className="grid gap-2 my-2 sm:grid-cols-2">
        <img src="https://static.wixstatic.com/media/539a77_8bb53a48ce7c4b918a5bc3d713775a4e~mv2.jpg/v1/crop/x_371,y_404,w_3490,h_4596/fill/w_938,h_1089,fp_0.50_0.50,q_85,usm_0.66_1.00_0.01,enc_auto/SUMMER_SPRING%20COLLECTION%202023.jpg" />
        <img src="https://static.wixstatic.com/media/539a77_b5e48d3eb7a6464f81a3c3c993565305~mv2.jpg/v1/fill/w_938,h_1089,fp_0.45_0.20,q_85,usm_0.66_1.00_0.01,enc_auto/FALL_WINTER%20COLLECTION.jpg" />

        <img src="https://static.wixstatic.com/media/539a77_614b16b95fc84d169060955d8864868a~mv2.jpg/v1/fill/w_938,h_1089,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/ACCESORIES.jpg" />
        <img src="https://static.wixstatic.com/media/539a77_7250e505f0ae44c1b29b3c48d15353d2~mv2.jpg/v1/crop/x_524,y_498,w_2446,h_3761/fill/w_938,h_1089,fp_0.50_0.50,q_85,usm_0.66_1.00_0.01,enc_auto/TSHIRT.jpg" />
      </div>
    </div>
  );
};

export default CustomerHomePage;
