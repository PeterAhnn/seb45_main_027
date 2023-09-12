import React from "react";

const MyInfoLike = ({ imgSrc, title, itemId, toggleLike, isLiked }) => {
  const handleToggleLike = () => {
    toggleLike(itemId);
  };

  return (
    <div className="m-2 h-full w-[140px] md:w-[150px] xl:w-[170px] text-[#57534e]">
      <div className="relative">
        <img
          className="rounded-lg object-cover w-[130px] h-[120px] md:w-[150px] md:h-[135px]  xl:w-[170px] xl:h-[155px]"
          src={imgSrc}
          alt="content"
        />
        <button
          onClick={handleToggleLike}
          className="absolute bottom-3.5 right-3.5 cursor-pointer"
        >
          <img
            src={
              isLiked
                ? "https://homepagepictures.s3.ap-northeast-2.amazonaws.com/client/public/images/isLiked.png"
                : "https://homepagepictures.s3.ap-northeast-2.amazonaws.com/client/public/images/emptyHeart.png"
            }
            alt="Like"
            style={{
              width: "100%",
              height: "100%",
            }}
          />
        </button>
      </div>
      <div className="flex flex-col items-center md:mb-4">
        <div className="text-lg font-semibold p-2 mx-1 break-all">{title}</div>
      </div>
    </div>
  );
};

export default MyInfoLike;
