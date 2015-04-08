class Api::GroupsController < ApplicationController
  before_action :require_signed_in

  def index
    type = params["type"]
    if type == "created"
      @groups = Group.where(organizer_id: current_user.id)
    elsif type == "joined"
    else
      @groups = Group.where.not(organizer_id: current_user.id)
    end

    render :json => @groups
  end

  def new
    @group = Group.new
    render :json => @group
  end

  def create
    @group = Group.new(group_params)
    @group.organizer_id = current_user.id

    if @group.save
      redirect_to api_group_url(@group)
      render :json => @group
    else
      flash.now[:errors] = @group.errors.full_messages
      render :new
    end
  end

  def show
    @group = Group.find(params[:id])
    @organizer = @group.organizer
    render "show"
  end

  def edit
    @group = Group.find(params[:id])
    redirect_to api_group_url(@group) unless @group.organizer_id == current_user.id
    render :json => @group
  end

  def update
    @group = Group.find(params[:id])

    if @group.update(group_params)
      redirect_to api_group_url(@group)
      render :json => @group
    else
      flash.now[:errors] = @group.errors.full_messages
      render :edit
    end
  end

  def destroy
    @group = Group.find(params[:id])
    @group.destroy
    render :json => @group
  end

  private

  def group_params
    params.require(:group).permit(:title, :description)
  end
end