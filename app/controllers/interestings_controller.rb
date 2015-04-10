class InterestingsController < ApplicationController
  def create
    @interesting = Interesting.new(
      interest_id: params[:interest_id],
      interestable_id: current_user.id,
      interestable_type: params[:type]
    )

    if @interesting.save
      render json: @interesting
    else
      render json: @interesting
    end
  end

  def destroy
    @interestings = Interesting.find(params[:id])
    @interesting.destroy
    render json: @interesting
  end

  private
end